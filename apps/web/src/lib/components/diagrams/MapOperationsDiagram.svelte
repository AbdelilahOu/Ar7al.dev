<svg viewBox="0 0 700 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated diagram cycling through insert, get, and delete operations on a map">
	<text x="350" y="20" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="13" font-weight="700" text-anchor="middle">
		insert(map, "B", 2)
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.05;0.07;0.33;0.35;1" dur="12s" repeatCount="indefinite"></animate>
	</text>
	<text x="350" y="20" fill="#60a5fa" font-family="'JetBrains Mono Variable', monospace" font-size="13" font-weight="700" text-anchor="middle">
		get(map, "B") -&gt; 2
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.35;0.37;0.63;0.65;1" dur="12s" repeatCount="indefinite"></animate>
	</text>
	<text x="350" y="20" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="13" font-weight="700" text-anchor="middle">
		delete(map, "B")
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.65;0.67;0.93;0.95;1" dur="12s" repeatCount="indefinite"></animate>
	</text>

	<line x1="350" y1="68" x2="350" y2="68" stroke="#60a5fa" stroke-width="1.6">
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.42;0.43;0.58;0.60;1" dur="12s" repeatCount="indefinite"></animate>
		<animate attributeName="y2" values="68;68;54;54;68" keyTimes="0;0.43;0.47;0.58;1" dur="12s" repeatCount="indefinite"></animate>
	</line>
	<polygon points="344,54 356,54 350,45" fill="#60a5fa">
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.46;0.47;0.58;0.60;1" dur="12s" repeatCount="indefinite"></animate>
	</polygon>
	<text x="350" y="38" fill="#60a5fa" font-family="'JetBrains Mono Variable', monospace" font-size="12" font-weight="700" text-anchor="middle">
		2
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.47;0.49;0.58;0.60;1" dur="12s" repeatCount="indefinite"></animate>
		<animateTransform attributeName="transform" type="translate" values="0,6;0,6;0,0;0,0" keyTimes="0;0.47;0.49;1" dur="12s" repeatCount="indefinite"></animateTransform>
	</text>

	<rect x="60" y="70" width="180" height="54" fill="#1a1a1a" stroke="#52525b" stroke-width="1.5"></rect>
	<text x="150" y="102" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="13" text-anchor="middle">A: 1</text>

	<rect x="460" y="70" width="180" height="54" fill="#1a1a1a" stroke="#52525b" stroke-width="1.5"></rect>
	<text x="550" y="102" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="13" text-anchor="middle">C: 3</text>

	<g>
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.12;0.19;0.72;0.79;1" dur="12s" repeatCount="indefinite"></animate>
		<animateTransform attributeName="transform" type="translate" values="0,-15;0,-15;0,0;0,0;0,15;0,15" keyTimes="0;0.12;0.19;0.72;0.79;1" dur="12s" repeatCount="indefinite"></animateTransform>
		<rect x="260" y="70" width="180" height="54" fill="#1a1a1a" stroke="#52525b" stroke-width="1.5">
			<animate attributeName="stroke" values="#52525b;#52525b;#10b981;#52525b;#52525b;#60a5fa;#60a5fa;#52525b;#52525b;#f87171;#52525b;#52525b" keyTimes="0;0.17;0.19;0.21;0.41;0.43;0.47;0.49;0.70;0.72;0.74;1" dur="12s" repeatCount="indefinite"></animate>
		</rect>
		<text x="350" y="102" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="13" text-anchor="middle">B: 2</text>
	</g>

	<text x="350" y="165" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" font-style="italic" text-anchor="middle">insert, get, and delete only touch the key they target</text>
</svg>
