<svg viewBox="0 0 720 150" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated diagram walking through a key being hashed and routed to a shard index, with example values">
	<rect x="10" y="45" width="150" height="50" fill="#1a1a1a" stroke="#52525b">
		<animate attributeName="stroke" values="#52525b;#f9fafb;#f9fafb;#52525b;#52525b" keyTimes="0;0.02;0.08;0.10;1" dur="8s" repeatCount="indefinite"></animate>
	</rect>
	<text x="85" y="74" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="13" text-anchor="middle">key</text>
	<text x="85" y="112" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle" opacity="0">
		= "user:42"
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.04;0.06;0.90;0.92;1" dur="8s" repeatCount="indefinite"></animate>
	</text>

	<line x1="160" y1="70" x2="196" y2="70" stroke="#6b7280" stroke-width="1.3"></line>
	<polygon points="196,70 188,66 188,74" fill="#6b7280"></polygon>
	<circle cy="70" r="3" fill="#f9fafb" opacity="0">
		<animate attributeName="cx" values="160;160;196;196" keyTimes="0;0.10;0.16;1" dur="8s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.10;0.11;0.15;0.16;1" dur="8s" repeatCount="indefinite"></animate>
	</circle>

	<rect x="200" y="45" width="150" height="50" fill="#1a1a1a" stroke="#60a5fa" stroke-width="1.3">
		<animate attributeName="stroke-width" values="1.3;1.3;2.4;2.4;1.3;1.3" keyTimes="0;0.16;0.18;0.28;0.30;1" dur="8s" repeatCount="indefinite"></animate>
	</rect>
	<text x="275" y="74" fill="#60a5fa" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">fnv64a(key)</text>
	<text x="275" y="112" fill="#60a5fa" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle" opacity="0">
		= 8213740922
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.20;0.22;0.90;0.92;1" dur="8s" repeatCount="indefinite"></animate>
	</text>

	<line x1="350" y1="70" x2="386" y2="70" stroke="#6b7280" stroke-width="1.3"></line>
	<polygon points="386,70 378,66 378,74" fill="#6b7280"></polygon>
	<circle cy="70" r="3" fill="#60a5fa" opacity="0">
		<animate attributeName="cx" values="350;350;386;386" keyTimes="0;0.30;0.36;1" dur="8s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.30;0.31;0.35;0.36;1" dur="8s" repeatCount="indefinite"></animate>
	</circle>

	<rect x="390" y="45" width="150" height="50" fill="#1a1a1a" stroke="#52525b">
		<animate attributeName="stroke" values="#52525b;#52525b;#60a5fa;#60a5fa;#52525b;#52525b" keyTimes="0;0.36;0.38;0.48;0.50;1" dur="8s" repeatCount="indefinite"></animate>
	</rect>
	<text x="465" y="74" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="11.5" text-anchor="middle">hash % numShards</text>
	<text x="465" y="112" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="9" text-anchor="middle" opacity="0">
		8213740922 % 4 = 2
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.40;0.42;0.90;0.92;1" dur="8s" repeatCount="indefinite"></animate>
	</text>

	<line x1="540" y1="70" x2="576" y2="70" stroke="#6b7280" stroke-width="1.3"></line>
	<polygon points="576,70 568,66 568,74" fill="#6b7280"></polygon>
	<circle cy="70" r="3" fill="#10b981" opacity="0">
		<animate attributeName="cx" values="540;540;576;576" keyTimes="0;0.50;0.56;1" dur="8s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.50;0.51;0.55;0.56;1" dur="8s" repeatCount="indefinite"></animate>
	</circle>

	<rect x="580" y="45" width="130" height="50" fill="#1a1a1a" stroke="#10b981" stroke-width="1.3">
		<animate attributeName="stroke-width" values="1.3;1.3;2.6;2.6;1.3;1.3" keyTimes="0;0.56;0.58;0.68;0.70;1" dur="8s" repeatCount="indefinite"></animate>
	</rect>
	<text x="645" y="74" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">shard[x]</text>
	<text x="645" y="112" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle" opacity="0">
		shard[2] -&gt; map
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.60;0.62;0.90;0.92;1" dur="8s" repeatCount="indefinite"></animate>
	</text>

	<text x="360" y="130" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" font-style="italic" text-anchor="middle">same key always -&gt; same shard</text>
</svg>
