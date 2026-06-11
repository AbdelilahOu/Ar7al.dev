<script lang="ts">
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';

	interface Props {
		bgColor?: string;
		children: Snippet;
	}

	let { bgColor = '#0c0c0c', children }: Props = $props();

	let svgElement: SVGSVGElement | null = $state(null);
	let width = $state(768);
	let height = $state(768);
	let ready = $state(false);

	let size = $derived.by(() => {
		if (!browser) return 15;
		const widthPercentage = window.innerWidth <= 768 ? 0.05 : 0.02;
		return Math.floor(width * widthPercentage);
	});

	let columns = $derived(Math.ceil(width / size));

	function getRandomRects(maxCount: number): number[] {
		const count = Math.floor(Math.random() * maxCount);
		return Array.from({ length: count }, (_, i) => i + 1);
	}

	$effect(() => {
		if (!svgElement) return;
		width = svgElement.clientWidth || 768;
		height = svgElement.clientHeight || 768;

		// Defer the decorative rects until the browser is idle so they
		// render once, at the measured size, outside the hydration task.
		let cancelled = false;
		const schedule: (cb: () => void) => void =
			typeof window.requestIdleCallback === 'function'
				? (cb) => window.requestIdleCallback(cb)
				: (cb) => window.setTimeout(cb, 150);
		schedule(() => {
			if (!cancelled) ready = true;
		});
		return () => {
			cancelled = true;
		};
	});
</script>

<div class="corner-brackets group relative bg-[#101010] p-5">
	{#if browser}
		<svg
			bind:this={svgElement}
			aria-hidden="true"
			data-nosnippet
			class="absolute left-0 top-0 z-0 h-full w-full"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{#each ready ? Array.from({ length: columns }, (_, i) => i + 1) : [] as x}
				{@const bottomRects = getRandomRects(height / 2 / size)}
				{@const topRects = getRandomRects(height / 2 / size)}
				{#each bottomRects as y}
					<rect
						x={(x - 1) * size}
						y={height - size * y}
						width={size}
						height={size}
						style="fill: {bgColor}; stroke: {bgColor}; opacity: {Math.random().toFixed(2)};"
					/>
				{/each}
				{#each topRects as y}
					<rect
						x={(x - 1) * size}
						y={size * (y - 1)}
						width={size}
						height={size}
						style="fill: {bgColor}; stroke: {bgColor}; opacity: {Math.random().toFixed(2)};"
					/>
				{/each}
			{/each}
		</svg>
	{/if}
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
