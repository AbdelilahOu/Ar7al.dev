<svg viewBox="0 0 720 150" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing a key being hashed and routed to a shard index">
	<rect x="10" y="45" width="150" height="50" fill="#1a1a1a" stroke="#52525b"></rect>
	<text x="85" y="35" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10" text-anchor="middle">key</text>
	<text x="85" y="74" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">"user:42"</text>
	<line x1="160" y1="70" x2="196" y2="70" stroke="#6b7280" stroke-width="1.3"></line>
	<polygon points="196,70 188,66 188,74" fill="#6b7280"></polygon>
	<rect x="200" y="45" width="150" height="50" fill="#1a1a1a" stroke="#60a5fa" stroke-width="1.3"></rect>
	<text x="275" y="74" fill="#60a5fa" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">fnv64a(key)</text>
	<line x1="350" y1="70" x2="386" y2="70" stroke="#6b7280" stroke-width="1.3"></line>
	<polygon points="386,70 378,66 378,74" fill="#6b7280"></polygon>
	<rect x="390" y="45" width="150" height="50" fill="#1a1a1a" stroke="#52525b"></rect>
	<text x="465" y="74" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="11.5" text-anchor="middle">hash % numShards</text>
	<line x1="540" y1="70" x2="576" y2="70" stroke="#6b7280" stroke-width="1.3"></line>
	<polygon points="576,70 568,66 568,74" fill="#6b7280"></polygon>
	<rect x="580" y="45" width="130" height="50" fill="#1a1a1a" stroke="#10b981" stroke-width="1.3"></rect>
	<text x="645" y="74" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">shard[2]</text>
	<text x="360" y="130" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" font-style="italic" text-anchor="middle">same key always -&gt; same shard</text>
</svg>
