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

# Get version from package.json
get_version() {
    if [[ -f "package.json" ]]; then
        node -e "console.log(require('./package.json').version)"
    else
        echo "0.0.0"
    fi
}

# Get short SHA
get_short_sha() {
    git rev-parse --short=7 HEAD 2>/dev/null || echo "unknown"
}

# Main execution
main() {
    log_info "Creating tarball from build directory..."

    # Check if build directory exists
    if [[ ! -d "build" ]]; then
        log_error "Build directory not found. Please run 'mise run build' first."
        exit 1
    fi

    # Get version and SHA
    VERSION=$(get_version)
    SHORT_SHA=$(get_short_sha)

    # Construct filename
    TARBALL="fahrenheight-${VERSION}-${SHORT_SHA}.tgz"

    log_info "Version: ${VERSION}"
    log_info "SHA: ${SHORT_SHA}"
    log_info "Tarball: ${TARBALL}"

    # Create tarball
    log_info "Creating tarball..."
    tar -czf "$TARBALL" -C build .

    # Get tarball size
    if command -v du &> /dev/null; then
        SIZE=$(du -h "$TARBALL" | cut -f1)
        log_info "Tarball created: ${TARBALL} (${SIZE})"
    else
        log_info "Tarball created: ${TARBALL}"
    fi

    # Generate checksums
    log_info "Generating checksums..."

    if command -v sha256sum &> /dev/null; then
        sha256sum "$TARBALL" > "${TARBALL}.sha256"
        log_info "SHA256: $(cat "${TARBALL}.sha256")"
    else
        log_warn "sha256sum not found, skipping SHA256 checksum"
    fi

    if command -v sha512sum &> /dev/null; then
        sha512sum "$TARBALL" > "${TARBALL}.sha512"
        log_info "SHA512 checksum created: ${TARBALL}.sha512"
    else
        log_warn "sha512sum not found, skipping SHA512 checksum"
    fi

    log_info "✅ Tarball creation complete!"
    log_info ""
    log_info "Files created:"
    log_info "  - ${TARBALL}"
    [[ -f "${TARBALL}.sha256" ]] && log_info "  - ${TARBALL}.sha256"
    [[ -f "${TARBALL}.sha512" ]] && log_info "  - ${TARBALL}.sha512"

    # Output tarball name for use in scripts
    echo "$TARBALL"
}

# Run main function
main "$@"
