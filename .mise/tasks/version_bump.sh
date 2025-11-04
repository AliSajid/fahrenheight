#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
#
# SPDX-License-Identifier: MIT

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get current branch
get_current_branch() {
    git rev-parse --abbrev-ref HEAD
}

# Get the last prerelease version for a given branch
get_last_prerelease() {
    local branch=$1
    local pre_tag="${branch}"

    # Get the latest tag matching the pattern
    local latest_tag=$(git tag -l --sort=-version:refname "*-${pre_tag}.*" | head -n1)

    if [[ -z "$latest_tag" ]]; then
        echo "0"
        return
    fi

    # Extract the prerelease number
    # Example: v1.2.0-next.3 -> 3
    local pre_number=$(echo "$latest_tag" | grep -oP "(?<=-${pre_tag}\.)\d+$" || echo "0")
    echo "$pre_number"
}

# Calculate next prerelease number
calculate_next_prerelease() {
    local branch=$1
    local last_number=$(get_last_prerelease "$branch")
    echo $((last_number + 1))
}

# Get the base version for prerelease
get_base_version() {
    # Get the latest stable version tag
    local latest_stable=$(git tag -l --sort=-version:refname "v*.*.*" | grep -v "-" | head -n1)

    if [[ -z "$latest_stable" ]]; then
        # No stable version exists, start with 0.1.0
        echo "0.1.0"
        return
    fi

    # Remove the 'v' prefix
    echo "${latest_stable#v}"
}

# Bump version for main branch using cog
bump_main() {
    log_info "Bumping version on main branch using cog..."

    # Run cog bump with auto detection to get the next version
    # Use dry-run first to determine the version
    local next_version=$(cog bump --auto --dry-run 2>/dev/null || echo "")

    if [[ -n "$next_version" ]]; then
        log_info "Next version will be: $next_version"

        # Update package.json with the new version
        update_package_json "$next_version"
    fi

    # Run cog bump with auto detection
    # cog.toml pre_bump_hooks will stage package.json if modified
    # cog will create a single commit with:
    # - Updated package.json
    # - Generated CHANGELOG.md
    # cog.toml post_bump_hooks will handle pushing to remote
    log_info "Running: cog bump --auto"
    cog bump --auto

    # Get the new version
    local new_version=$(git describe --tags --abbrev=0)
    log_info "New version: $new_version"

    echo "$new_version"
}

# Update package.json with new version
update_package_json() {
    local version=$1
    if [[ -f "package.json" ]]; then
        log_info "Updating package.json version to $version"
        node -e "
            const fs = require('fs');
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            pkg.version = '$version';
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
        "
    fi
}

# Bump version for next branch (prerelease)
bump_next() {
    log_info "Bumping version on next branch (prerelease)..."

    # Get base version
    local base_version=$(get_base_version)
    log_info "Base version: $base_version"

    # Calculate next prerelease number
    local next_number=$(calculate_next_prerelease "next")
    log_info "Next prerelease number: $next_number"

    # Construct prerelease version
    local pre_version="${base_version}-next.${next_number}"
    log_info "Prerelease version: $pre_version"

    # Update package.json BEFORE cog bump
    # This ensures it's included in the same commit
    update_package_json "$pre_version"

    # Use cog bump with explicit version and next profile
    # This will create a single commit with the updated package.json
    # The profile hooks will handle pushing
    log_info "Running: cog bump --version $pre_version --hook-profile next"
    cog bump --version "$pre_version" --hook-profile next

    echo "v$pre_version"
}



# Main execution
main() {
    log_info "Starting version bump process..."

    # Ensure we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository"
        exit 1
    fi

    # Get current branch
    local current_branch=$(get_current_branch)
    log_info "Current branch: $current_branch"

    # Validate branch
    if [[ "$current_branch" != "main" && "$current_branch" != "next" ]]; then
        log_error "Version bumps are only allowed on 'main' or 'next' branches"
        log_error "Current branch: $current_branch"
        exit 1
    fi

    # Check for uncommitted changes (except on next branch where we might be updating package.json)
    if [[ "$current_branch" == "main" && -n $(git status --porcelain) ]]; then
        log_error "Working directory has uncommitted changes"
        log_error "Please commit or stash changes before bumping version"
        exit 1
    fi

    # Bump version based on branch
    local new_version
    if [[ "$current_branch" == "main" ]]; then
        new_version=$(bump_main)
    elif [[ "$current_branch" == "next" ]]; then
        new_version=$(bump_next)
    fi

    log_info "✅ Version bump complete!"
    log_info "Version: $new_version"
    log_info "Branch: $current_branch"
    log_info ""
    log_info "Cocogitto post-bump hooks have automatically:"
    log_info "  ✓ Pushed changes to remote ($current_branch)"
    log_info "  ✓ Pushed tag to remote ($new_version)"
    log_info ""
    log_info "GitHub Actions workflows will trigger automatically:"
    log_info "  • Deploy workflow: Triggered by tag push"
    log_info "  • Release workflow: Triggered by tag push"
    log_info ""
    log_info "Next steps:"
    log_info "  1. Monitor GitHub Actions for workflow status"
    log_info "  2. Verify the release artifacts on GitHub Releases"
    log_info "  3. Check the deployed site on GitHub Pages"
}

# Run main function
main "$@"
