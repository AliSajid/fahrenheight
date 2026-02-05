<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<section>
    <h2 class="h2 mb-4">What is the Approximation Formula?</h2>
    <p class="text-surface-600-300-token mb-4">
        The approximation formula <code class="code">(F - 30) / 2 ≈ C</code> is a
        quick mental math trick for estimating Celsius from Fahrenheit. It's simpler
        than the exact formula but introduces some error.
    </p>

    <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 bg-surface-100-800-token rounded-lg">
            <h3 class="h3 mb-2">Exact Formula</h3>
            <code class="code">C = (F - 32) × 5/9</code>
            <p class="text-sm text-surface-600-300-token mt-2">
                Requires multiplication and division by fractions
            </p>
        </div>

        <div class="p-4 bg-surface-100-800-token rounded-lg">
            <h3 class="h3 mb-2">Approximation</h3>
            <code class="code">C ≈ (F - 30) / 2</code>
            <p class="text-sm text-surface-600-300-token mt-2">
                Easy mental math: subtract 30, divide by 2
            </p>
        </div>
    </div>
</section>

<section>
    <h2 class="h2 mb-4">How Accurate Is It?</h2>
    <p class="text-surface-600-300-token mb-4">
        The percentage difference shows how close the approximation is to the
        exact value. The accuracy varies across different temperature ranges:
    </p>

    <div class="space-y-3">
        <div class="p-4 bg-success-100-800-token rounded-lg">
            <h3 class="font-semibold mb-1">Best Accuracy: 50-90°F (10-32°C)</h3>
            <p class="text-sm text-surface-600-300-token">
                Error typically under 5% - great for everyday temperatures
            </p>
        </div>

        <div class="p-4 bg-warning-100-800-token rounded-lg">
            <h3 class="font-semibold mb-1">
                Moderate Accuracy: 32-50°F or 90-100°F
            </h3>
            <p class="text-sm text-surface-600-300-token">
                Error around 5-10% - still useful for quick estimates
            </p>
        </div>

        <div class="p-4 bg-error-100-800-token rounded-lg">
            <h3 class="font-semibold mb-1">
                Lower Accuracy: Below 32°F or Above 100°F
            </h3>
            <p class="text-sm text-surface-600-300-token">
                Error can exceed 10% - use exact formula for precision
            </p>
        </div>
    </div>
</section>

<section>
    <h2 class="h2 mb-4">Visual Comparison</h2>
    <p class="text-surface-600-300-token mb-4">
        The converter displays the percentage difference between the exact and
        approximate conversions, helping you understand when the approximation
        is "good enough" versus when precision matters.
    </p>

    <div class="p-4 bg-surface-100-800-token rounded-lg">
        <h3 class="h3 mb-2">Understanding the Percentage</h3>
        <ul class="list-disc list-inside space-y-2 text-surface-600-300-token">
            <li>
                <strong>0-2%:</strong> Excellent approximation, virtually identical
            </li>
            <li>
                <strong>2-5%:</strong> Good approximation, acceptable for most purposes
            </li>
            <li>
                <strong>5-10%:</strong> Moderate error, noticeable difference
            </li>
            <li>
                <strong>Above 10%:</strong> Significant error, use exact formula
            </li>
        </ul>
    </div>
</section>

<section>
    <h2 class="h2 mb-4">When to Use Each Method</h2>

    <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 bg-primary-100-800-token rounded-lg">
            <h3 class="h3 mb-2">Use Approximation</h3>
            <ul
                class="list-disc list-inside space-y-1 text-sm text-surface-600-300-token"
            >
                <li>Quick mental estimates</li>
                <li>Everyday weather discussions</li>
                <li>General understanding of temperature</li>
                <li>When speed matters more than precision</li>
            </ul>
        </div>

        <div class="p-4 bg-secondary-100-800-token rounded-lg">
            <h3 class="h3 mb-2">Use Exact Formula</h3>
            <ul
                class="list-disc list-inside space-y-1 text-sm text-surface-600-300-token"
            >
                <li>Scientific calculations</li>
                <li>Cooking and baking</li>
                <li>Medical applications</li>
                <li>Extreme temperatures</li>
            </ul>
        </div>
    </div>
</section>
