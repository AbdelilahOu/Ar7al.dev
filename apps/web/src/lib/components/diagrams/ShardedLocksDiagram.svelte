<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
	<svg viewBox="0 0 350 290" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One lock: goroutines queue for the same mutex">
		<rect x="0" y="0" width="350" height="290" fill="#141414" stroke="#f87171" stroke-width="1.5"></rect>
		<text x="175" y="28" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="15" font-weight="700" text-anchor="middle">ONE LOCK</text>
		<text x="175" y="44" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="10" text-anchor="middle">goroutines queue for the same mutex</text>
		<rect x="35" y="60" width="60" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="65" y="78" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">G1</text>
		<rect x="115" y="60" width="60" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="145" y="78" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">G2</text>
		<rect x="195" y="60" width="60" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="225" y="78" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">G3</text>
		<rect x="275" y="60" width="60" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="305" y="78" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">G4</text>
		<text x="65" y="100" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="middle">active</text>
		<text x="145" y="100" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="middle">blocked</text>
		<text x="225" y="100" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="middle">blocked</text>
		<text x="305" y="100" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="middle">blocked</text>
		<line x1="65" y1="88" x2="175" y2="140" stroke="#10b981" stroke-width="1.6"></line>
		<line x1="145" y1="88" x2="175" y2="140" stroke="#6b7280" stroke-width="1.2" stroke-dasharray="4 3"></line>
		<line x1="225" y1="88" x2="175" y2="140" stroke="#6b7280" stroke-width="1.2" stroke-dasharray="4 3"></line>
		<line x1="305" y1="88" x2="175" y2="140" stroke="#6b7280" stroke-width="1.2" stroke-dasharray="4 3"></line>
		<rect x="95" y="140" width="160" height="40" fill="#1a1a1a" stroke="#f87171" stroke-width="1.3"></rect>
		<text x="175" y="164" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">sync.Mutex</text>
		<line x1="175" y1="180" x2="175" y2="210" stroke="#6b7280" stroke-width="1.2"></line>
		<rect x="95" y="210" width="160" height="36" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="175" y="232" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">map[string]V</text>
		<text x="175" y="270" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10" font-style="italic" text-anchor="middle">one writer at a time -&gt; everyone else stalls</text>
	</svg>
	<svg viewBox="0 0 350 290" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sharded locks: each key hashes to its own shard">
		<rect x="0" y="0" width="350" height="290" fill="#141414" stroke="#10b981" stroke-width="1.5"></rect>
		<text x="175" y="28" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="15" font-weight="700" text-anchor="middle">SHARDED LOCKS</text>
		<text x="175" y="44" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="10" text-anchor="middle">each key hashes to its own shard</text>
		<rect x="18" y="60" width="60" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="48" y="78" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">G1</text>
		<rect x="103" y="60" width="60" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="133" y="78" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">G2</text>
		<rect x="188" y="60" width="60" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="218" y="78" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">G3</text>
		<rect x="273" y="60" width="60" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="303" y="78" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11" text-anchor="middle">G4</text>
		<text x="48" y="100" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="middle">active</text>
		<text x="133" y="100" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="middle">active</text>
		<text x="218" y="100" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="middle">active</text>
		<text x="303" y="100" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="8.5" text-anchor="middle">active</text>
		<line x1="48" y1="88" x2="48" y2="140" stroke="#60a5fa" stroke-width="1.4"></line>
		<line x1="133" y1="88" x2="133" y2="140" stroke="#60a5fa" stroke-width="1.4"></line>
		<line x1="218" y1="88" x2="218" y2="140" stroke="#60a5fa" stroke-width="1.4"></line>
		<line x1="303" y1="88" x2="303" y2="140" stroke="#60a5fa" stroke-width="1.4"></line>
		<rect x="13" y="140" width="70" height="44" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="48" y="157" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="10" text-anchor="middle">Shard 0</text>
		<text x="48" y="171" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="8" text-anchor="middle">RWMutex</text>
		<rect x="98" y="140" width="70" height="44" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="133" y="157" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="10" text-anchor="middle">Shard 1</text>
		<text x="133" y="171" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="8" text-anchor="middle">RWMutex</text>
		<rect x="183" y="140" width="70" height="44" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="218" y="157" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="10" text-anchor="middle">Shard 2</text>
		<text x="218" y="171" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="8" text-anchor="middle">RWMutex</text>
		<rect x="268" y="140" width="70" height="44" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="303" y="157" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="10" text-anchor="middle">Shard 3</text>
		<text x="303" y="171" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="8" text-anchor="middle">RWMutex</text>
		<line x1="48" y1="184" x2="48" y2="204" stroke="#6b7280" stroke-width="1.1"></line>
		<line x1="133" y1="184" x2="133" y2="204" stroke="#6b7280" stroke-width="1.1"></line>
		<line x1="218" y1="184" x2="218" y2="204" stroke="#6b7280" stroke-width="1.1"></line>
		<line x1="303" y1="184" x2="303" y2="204" stroke="#6b7280" stroke-width="1.1"></line>
		<rect x="13" y="204" width="70" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="48" y="222" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="8" text-anchor="middle">map[K]V</text>
		<rect x="98" y="204" width="70" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="133" y="222" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="8" text-anchor="middle">map[K]V</text>
		<rect x="183" y="204" width="70" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="218" y="222" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="8" text-anchor="middle">map[K]V</text>
		<rect x="268" y="204" width="70" height="28" fill="#1a1a1a" stroke="#52525b"></rect>
		<text x="303" y="222" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="8" text-anchor="middle">map[K]V</text>
		<text x="175" y="270" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10" font-style="italic" text-anchor="middle">four locks -&gt; no stalling between shards</text>
	</svg>
</div>
