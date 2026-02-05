<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<section>
    <h2 class="h2 mb-4">The Conversions</h2>
    <p class="text-surface-600-300-token mb-4">
        Fahrenheit and Celsius don't line up in any friendly way, so the real
        conversions use a little algebra. Sometimes you just want a ballpark
        number without doing fractions in your head. Here are the exact formulas
        and their quick approximations side by side:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Exact Formulas Column -->
        <div class="space-y-4">
            <h3 class="h3 mb-2">Exact Formulas</h3>
            <div class="p-4 bg-surface-100-800-token rounded-lg">
                <h4 class="h4 mb-2">Fahrenheit to Celsius</h4>
                <code class="code text-lg">C = (F - 32) × 5/9</code>
                <p class="text-sm text-surface-600-300-token mt-2">
                    Example: 68°F = (68 − 32) × 5/9 = 20°C
                </p>
            </div>

            <div class="p-4 bg-surface-100-800-token rounded-lg">
                <h4 class="h4 mb-2">Celsius to Fahrenheit</h4>
                <code class="code text-lg">F = C × 9/5 + 32</code>
                <p class="text-sm text-surface-600-300-token mt-2">
                    Example: 20°C = 20 × 9/5 + 32 = 68°F
                </p>
            </div>
        </div>

        <!-- Approximate Formulas Column -->
        <div class="space-y-4">
            <h3 class="h3 mb-2">Quick Approximation</h3>
            <div class="p-4 bg-surface-100-800-token rounded-lg">
                <h4 class="h4 mb-2">Fahrenheit to Celsius (Approximate)</h4>
                <code class="code text-lg">C ≈ (F − 30) / 2</code>
                <p class="text-sm text-surface-600-300-token mt-2">
                    Example: 68°F ≈ (68 − 30) / 2 = 19°C (actual: 20°C)
                </p>
            </div>

            <div class="p-4 bg-surface-100-800-token rounded-lg">
                <h4 class="h4 mb-2">Celsius to Fahrenheit (Approximate)</h4>
                <code class="code text-lg">F ≈ 2C + 30</code>
                <p class="text-sm text-surface-600-300-token mt-2">
                    Example: 20°C ≈ 2 × 20 + 30 = 70°F (actual: 68°F)
                </p>
            </div>
        </div>
    </div>

    <p class="text-surface-600-300-token mt-4">
        The reason these shortcuts work is that the exact formulas are close to
        doubling and halving, just with that pesky 32°F offset and a ratio
        that's almost, but not quite, 2:1. Shifting the numbers a little smooths
        out the mental math without drifting too far from reality.
    </p>
</section>
<section>
    <h2 class="h2 mb-4">Using the Converter</h2>
    <ol class="list-decimal list-inside space-y-3 text-surface-600-300-token">
        <li>Type in a temperature</li>
        <li>Pick whether it's Celsius or Fahrenheit</li>
        <li>
            The converter shows the exact and approximate answers side by side
        </li>
        <li>It also shows how close the shortcut comes to the real value</li>
        <li>Everything runs instantly in your browser</li>
    </ol>
</section>
