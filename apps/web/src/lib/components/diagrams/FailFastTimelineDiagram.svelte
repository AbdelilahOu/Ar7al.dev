<svg viewBox="0 0 760 320" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated timeline showing fetchOrder finishing early and fetchProfile being cancelled the instant the timeout fires">
	<rect x="550" y="15" width="170" height="46" fill="#141414" stroke="#52525b"></rect>
	<text x="558" y="33" fill="#10b981" font-family="'JetBrains Mono Variable', monospace" font-size="9" text-anchor="start">errgroup: ~1.0s (fail-fast)</text>
	<text x="558" y="49" fill="#9ca3af" font-family="'JetBrains Mono Variable', monospace" font-size="9" text-anchor="start">WaitGroup: ~2.0s (waits)</text>

	<text x="80" y="40" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="12" font-weight="700" text-anchor="start">
		Aggregate(ctx, id)
		<animate attributeName="fill" values="#f9fafb;#f9fafb;#f87171;#f87171" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
	</text>
	<text x="225" y="40" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="12" font-weight="700" text-anchor="start" opacity="0">
		-&gt; error
		<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
	</text>

	<text x="80" y="82" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11.5" text-anchor="start">fetchOrder</text>
	<rect x="80" y="88" width="0" height="24" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1.3">
		<animate attributeName="width" values="0;0;145.5;145.5" keyTimes="0;0.0294;0.2434;1" dur="7s" repeatCount="indefinite"></animate>
	</rect>
	<text x="234" y="105" fill="#6ee7b7" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="start" opacity="0">
		done 0.5s
		<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.2434;0.26;1" dur="7s" repeatCount="indefinite"></animate>
	</text>

	<text x="80" y="152" fill="#f9fafb" font-family="'JetBrains Mono Variable', monospace" font-size="11.5" text-anchor="start">
		fetchProfile
		<animate attributeName="fill" values="#f9fafb;#f9fafb;#f87171;#f87171" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
	</text>
	<rect x="80" y="158" width="0" height="24" fill="#60a5fa" fill-opacity="0.25" stroke="#60a5fa" stroke-width="1.3">
		<animate attributeName="width" values="0;0;291;291" keyTimes="0;0.0294;0.4574;1" dur="7s" repeatCount="indefinite"></animate>
		<animate attributeName="stroke" values="#60a5fa;#60a5fa;#f87171;#f87171" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
		<animate attributeName="fill" values="#60a5fa;#60a5fa;#f87171;#f87171" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
	</rect>
	<rect x="371" y="158" width="291" height="24" fill="none" stroke="#6b7280" stroke-width="1.2" stroke-dasharray="4 3" opacity="0">
		<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
	</rect>
	<text x="380" y="200" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="start" opacity="0">
		cancelled -- never runs
		<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
	</text>

	<line x1="371" y1="70" x2="371" y2="230" stroke="#f87171" stroke-width="1.3" stroke-dasharray="5 4" opacity="0">
		<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
	</line>
	<text x="371" y="60" fill="#f87171" font-family="'JetBrains Mono Variable', monospace" font-size="10.5" font-weight="700" text-anchor="middle" opacity="0">
		ctx cancelled (timeout)
		<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4574;0.48;1" dur="7s" repeatCount="indefinite"></animate>
	</text>

	<line x1="60" y1="65" x2="60" y2="258" stroke="#f9fafb" stroke-width="1" opacity="0.55">
		<animate attributeName="x1" values="60;740" dur="7s" repeatCount="indefinite"></animate>
		<animate attributeName="x2" values="60;740" dur="7s" repeatCount="indefinite"></animate>
	</line>

	<line x1="60" y1="250" x2="740" y2="250" stroke="#52525b" stroke-width="1.2"></line>
	<line x1="80" y1="246" x2="80" y2="254" stroke="#6b7280" stroke-width="1.2"></line>
	<text x="80" y="268" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle">0s</text>
	<line x1="225.5" y1="246" x2="225.5" y2="254" stroke="#6b7280" stroke-width="1.2"></line>
	<text x="225.5" y="268" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle">0.5s</text>
	<line x1="371" y1="246" x2="371" y2="254" stroke="#6b7280" stroke-width="1.2"></line>
	<text x="371" y="268" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle">1s</text>
	<line x1="662" y1="246" x2="662" y2="254" stroke="#6b7280" stroke-width="1.2"></line>
	<text x="662" y="268" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="9.5" text-anchor="middle">2s</text>
	<text x="400" y="300" fill="#6b7280" font-family="'JetBrains Mono Variable', monospace" font-size="10" font-style="italic" text-anchor="middle">fetchProfile is cut off the instant the 1s timeout fires -- no wasted waiting</text>
</svg>
