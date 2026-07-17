<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
	<svg viewBox="0 0 350 360" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Before: scattered if/else branching per tool">
		<rect x="0" y="0" width="350" height="360" fill="#141414" stroke="#f87171" stroke-width="1.5"></rect>
		<text x="175" y="30" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="16" font-weight="700" text-anchor="middle">BEFORE</text>
		<text x="175" y="48" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" text-anchor="middle">scattered if / else per tool</text>
		<rect x="50" y="70" width="250" height="36" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="175" y="93" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">listTablesHandler()</text>
		<line x1="175" y1="106" x2="70" y2="148" stroke="#6b7280" stroke-width="1.2" stroke-dasharray="4 3"></line>
		<line x1="175" y1="106" x2="175" y2="148" stroke="#6b7280" stroke-width="1.2" stroke-dasharray="4 3"></line>
		<line x1="175" y1="106" x2="280" y2="148" stroke="#6b7280" stroke-width="1.2" stroke-dasharray="4 3"></line>
		<rect x="30" y="148" width="80" height="34" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="70" y="169" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" text-anchor="middle">postgres</text>
		<rect x="135" y="148" width="80" height="34" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="175" y="169" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" text-anchor="middle">mysql</text>
		<rect x="240" y="148" width="80" height="34" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="280" y="169" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" text-anchor="middle">sqlite</text>
		<text x="175" y="212" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10" font-style="italic" text-anchor="middle">repeated in all 20 tool files</text>
		<circle cx="175" cy="230" r="1.6" fill="#6b7280"></circle>
		<circle cx="175" cy="238" r="1.6" fill="#6b7280"></circle>
		<circle cx="175" cy="246" r="1.6" fill="#6b7280"></circle>
		<rect x="35" y="280" width="280" height="60" fill="none" stroke="#f87171" stroke-dasharray="5 4"></rect>
		<text x="175" y="303" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="12" font-weight="700" text-anchor="middle">+ CockroachDB support</text>
		<text x="175" y="323" fill="#fca5a5" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" text-anchor="middle">-&gt; edit 20 files, 1 bug risk each</text>
	</svg>
	<svg viewBox="0 0 350 360" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="After: tool handlers delegate to a driver interface">
		<rect x="0" y="0" width="350" height="360" fill="#141414" stroke="#10b981" stroke-width="1.5"></rect>
		<text x="175" y="30" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="16" font-weight="700" text-anchor="middle">AFTER</text>
		<text x="175" y="48" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" text-anchor="middle">one interface, one file per driver</text>
		<rect x="50" y="70" width="250" height="36" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="175" y="93" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">20 Tool Handlers</text>
		<line x1="175" y1="106" x2="175" y2="130" stroke="#6b7280" stroke-width="1.2"></line>
		<text x="215" y="122" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="start">session.Driver.X()</text>
		<rect x="75" y="132" width="200" height="34" fill="#1a1a1a" stroke="#60a5fa" stroke-width="1.3"></rect>
		<text x="175" y="154" fill="#60a5fa" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">Driver interface</text>
		<line x1="175" y1="166" x2="55" y2="208" stroke="#6b7280" stroke-width="1.2"></line>
		<line x1="175" y1="166" x2="135" y2="208" stroke="#6b7280" stroke-width="1.2"></line>
		<line x1="175" y1="166" x2="215" y2="208" stroke="#6b7280" stroke-width="1.2"></line>
		<line x1="175" y1="166" x2="295" y2="208" stroke="#10b981" stroke-width="1.2" stroke-dasharray="4 3"></line>
		<rect x="20" y="208" width="70" height="34" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="55" y="229" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle">Postgres</text>
		<rect x="100" y="208" width="70" height="34" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="135" y="229" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle">MySQL</text>
		<rect x="180" y="208" width="70" height="34" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="215" y="229" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle">SQLite</text>
		<rect x="260" y="208" width="70" height="34" fill="#1a1a1a" stroke="#10b981" stroke-dasharray="3 3"></rect>
		<text x="295" y="229" fill="#6ee7b7" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle">Cockroach</text>
		<text x="175" y="262" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10" font-style="italic" text-anchor="middle">one file per driver</text>
		<rect x="35" y="280" width="280" height="60" fill="none" stroke="#10b981"></rect>
		<text x="175" y="303" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="12" font-weight="700" text-anchor="middle">+ CockroachDB support</text>
		<text x="175" y="323" fill="#6ee7b7" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" text-anchor="middle">-&gt; add 1 file, 0 tool edits</text>
	</svg>
</div>
