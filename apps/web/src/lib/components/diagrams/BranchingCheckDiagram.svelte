<svg viewBox="0 0 720 180" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated diagram showing sequential branching checks through database types until a match is found and rows are returned to the AI Agent">
	<!-- Box 1: AI Agent -->
	<rect x="10" y="45" width="150" height="50" fill="#1a1a1a" stroke="#52525b" stroke-width="1.3">
		<animate attributeName="stroke" values="#52525b;#f9fafb;#f9fafb;#52525b;#52525b" keyTimes="0;0.02;0.08;0.10;1" dur="8s" repeatCount="indefinite"></animate>
	</rect>
	<text x="85" y="74" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">AI Agent</text>
	<text x="85" y="112" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle" opacity="0">
		call tool
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.04;0.06;0.90;0.92;1" dur="8s" repeatCount="indefinite"></animate>
	</text>

	<!-- Forward Connector 1 -->
	<line x1="160" y1="70" x2="236" y2="70" stroke="#6b7280" stroke-width="1.3"></line>
	<polygon points="236,70 228,66 228,74" fill="#6b7280"></polygon>
	<circle cy="70" r="3" fill="#f9fafb" opacity="0">
		<animate attributeName="cx" values="160;160;236;236" keyTimes="0;0.10;0.16;1" dur="8s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.10;0.11;0.15;0.16;1" dur="8s" repeatCount="indefinite"></animate>
	</circle>

	<!-- Box 2: listTablesHandler -->
	<rect x="240" y="45" width="180" height="50" fill="#1a1a1a" stroke="#60a5fa" stroke-width="1.3">
		<animate attributeName="stroke-width" values="1.3;1.3;2.4;2.4;1.3;1.3" keyTimes="0;0.16;0.18;0.28;0.30;1" dur="8s" repeatCount="indefinite"></animate>
	</rect>
	<text x="330" y="74" fill="#60a5fa" font-family="'JetBrains Mono Variable', monospace" font-size="12" text-anchor="middle">listTables()</text>

	<!-- Forward Connector 2 -->
	<line x1="420" y1="70" x2="496" y2="70" stroke="#6b7280" stroke-width="1.3"></line>
	<polygon points="496,70 488,66 488,74" fill="#6b7280"></polygon>
	<circle cy="70" r="3" fill="#60a5fa" opacity="0">
		<animate attributeName="cx" values="420;420;496;496" keyTimes="0;0.30;0.36;1" dur="8s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.30;0.31;0.35;0.36;1" dur="8s" repeatCount="indefinite"></animate>
	</circle>

	<!-- Box 3: if/else Checks -->
	<rect x="500" y="45" width="200" height="50" fill="#1a1a1a" stroke="#52525b">
		<animate attributeName="stroke" values="#52525b;#52525b;#f87171;#f87171;#10b981;#10b981;#52525b" keyTimes="0;0.36;0.38;0.50;0.52;0.68;1" dur="8s" repeatCount="indefinite"></animate>
	</rect>
	<text x="600" y="65" fill="#d1d5db" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" text-anchor="middle">if dbType ==</text>

	<!-- Cycling Checks -->
	<text x="600" y="82" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="11.5" font-weight="700" text-anchor="middle" opacity="0">
		"postgres"
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.38;0.40;0.48;0.50;1" dur="8s" repeatCount="indefinite"></animate>
	</text>
	<text x="600" y="82" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="11.5" font-weight="700" text-anchor="middle" opacity="0">
		"mysql"
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.50;0.52;0.68;0.70;1" dur="8s" repeatCount="indefinite"></animate>
	</text>

	<!-- Return Path to AI Agent -->
	<path d="M 600 95 L 600 135 L 85 135 L 85 103" fill="none" stroke="#10b981" stroke-width="1.3" opacity="0">
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.52;0.58;0.88;0.92;1" dur="8s" repeatCount="indefinite"></animate>
	</path>
	<polygon points="80,103 90,103 85,95" fill="#10b981" opacity="0">
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.52;0.58;0.88;0.92;1" dur="8s" repeatCount="indefinite"></animate>
	</polygon>

	<!-- Return Payload Label -->
	<text x="342" y="130" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="10" text-anchor="middle" opacity="0">
		rows
		<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.55;0.60;0.88;0.92;1" dur="8s" repeatCount="indefinite"></animate>
	</text>

	<!-- Footer Note -->
	<text x="360" y="165" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" font-style="italic" text-anchor="middle">checked one dbType at a time -- repeating across all tool files</text>
</svg>
