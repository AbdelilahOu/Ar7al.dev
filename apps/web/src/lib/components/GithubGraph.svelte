<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ContributionData } from '$lib/types';

	interface Props {
		data: ContributionData | null;
		year: number;
	}

	interface Day {
		col: number;
		row: number;
		month: number;
		/** -1 marks a future day in the current year */
		contributions: number;
	}

	let props: Props = $props();

	// Grid geometry in SVG units. The SVG scales to the container height, so these are ratios.
	const TILE = 10;
	const GAP = 2;
	const PITCH = TILE + GAP;
	// Room around the tiles so the month outline (drawn in the gaps) is not clipped
	const PAD = 1.5;
	const MONTHS = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	const today = new Date();

	let scrollContainer: HTMLDivElement | null = $state(null);
	let rootWidth = $state(0);
	let rootHeight = $state(0);
	let popoverWidth = $state(0);
	let scrollLeft = $state(0);
	let hoveredMonth: number | null = $state(null);

	let days = $derived.by(() => {
		const result: Day[] = [];
		const date = new Date(Date.UTC(props.year, 0, 1));
		const offset = date.getUTCDay();
		for (let i = 0; date.getUTCFullYear() === props.year; i++) {
			const isFuture = props.year === today.getFullYear() && date > today;
			result.push({
				col: Math.floor((i + offset) / 7),
				row: (i + offset) % 7,
				month: date.getUTCMonth(),
				contributions: isFuture ? -1 : (props.data?.cal[date.toISOString().slice(0, 10)]?.github ?? 0)
			});
			date.setUTCDate(date.getUTCDate() + 1);
		}
		return result;
	});

	let months = $derived(
		MONTHS.map((_, month) => {
			const monthDays = days.filter((day) => day.month === month);
			const first = monthDays[0];
			const last = monthDays[monthDays.length - 1];
			return {
				total: monthDays.reduce((sum, day) => sum + Math.max(0, day.contributions), 0),
				outline: outlinePath(first.col, first.row, last.col, last.row),
				center: (first.col * PITCH + last.col * PITCH + TILE) / 2
			};
		})
	);

	let columns = $derived(days[days.length - 1].col + 1);
	let viewWidth = $derived(columns * PITCH - GAP + 2 * PAD);
	const viewHeight = 7 * PITCH - GAP + 2 * PAD;

	let popoverLeft = $derived.by(() => {
		if (hoveredMonth === null || rootHeight === 0) return 0;
		const scale = rootHeight / viewHeight;
		const center = (months[hoveredMonth].center + PAD) * scale - scrollLeft;
		const half = popoverWidth / 2;
		return Math.min(Math.max(center, half), rootWidth - half);
	});

	/**
	 * Outline around a month's cells, which run column by column from (c1, r1) to (c2, r2):
	 * a partial first week, full weeks in between, and a partial last week.
	 */
	function outlinePath(c1: number, r1: number, c2: number, r2: number): string {
		const x = (col: number) => col * PITCH - GAP / 2;
		const y = (row: number) => row * PITCH - GAP / 2;
		const points = [
			[x(c1), y(r1)],
			[x(c1 + 1), y(r1)],
			[x(c1 + 1), y(0)],
			[x(c2 + 1), y(0)],
			[x(c2 + 1), y(r2 + 1)],
			[x(c2), y(r2 + 1)],
			[x(c2), y(7)],
			[x(c1), y(7)]
		];
		return `M${points.map((point) => point.join(' ')).join(' L')} Z`;
	}

	function tileColor(contributions: number): string {
		if (contributions === -1) return 'fill-raised/50';
		if (contributions === 0) return 'fill-raised';
		if (contributions <= 2) return 'fill-[#0e4429]';
		if (contributions <= 4) return 'fill-[#006d32]';
		if (contributions <= 6) return 'fill-[#26a641]';
		return 'fill-[#39d353]';
	}

	function handlePointerOver(event: PointerEvent): void {
		const month = (event.target as Element).getAttribute('data-month');
		if (month !== null) hoveredMonth = Number(month);
	}

	// Past years start scrolled to December; the current year centers on this week
	$effect(() => {
		if (!scrollContainer || rootHeight === 0) return;
		if (props.year < today.getFullYear()) {
			scrollContainer.scrollLeft = scrollContainer.scrollWidth;
			return;
		}
		const start = Date.UTC(props.year, 0, 1);
		const dayIndex = Math.floor((today.getTime() - start) / 86_400_000);
		const col = Math.floor((dayIndex + new Date(start).getUTCDay()) / 7);
		const scale = rootHeight / viewHeight;
		const center = (col * PITCH + TILE / 2 + PAD) * scale;
		scrollContainer.scrollLeft = Math.max(0, center - scrollContainer.clientWidth / 2);
	});
</script>

<div
	class="relative h-full w-full [container-type:size]"
	bind:clientWidth={rootWidth}
	bind:clientHeight={rootHeight}
>
	<div
		class="scrollbar-hide h-full overflow-x-auto"
		bind:this={scrollContainer}
		onscroll={() => (scrollLeft = scrollContainer?.scrollLeft ?? 0)}
	>
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<svg
			viewBox="{-PAD} {-PAD} {viewWidth} {viewHeight}"
			class="h-full"
			style="width: calc(100cqh * {viewWidth / viewHeight})"
			role="img"
			aria-label="GitHub contributions in {props.year}"
			onpointerover={handlePointerOver}
			onpointerleave={() => (hoveredMonth = null)}
		>
			{#each days as day}
				<rect
					x={day.col * PITCH}
					y={day.row * PITCH}
					width={TILE}
					height={TILE}
					rx="1.5"
					data-month={day.month}
					class="transition-opacity duration-200 {tileColor(day.contributions)} {hoveredMonth !== null &&
					day.month !== hoveredMonth
						? 'opacity-35'
						: ''}"
				/>
			{/each}
			{#if hoveredMonth !== null}
				<path
					d={months[hoveredMonth].outline}
					fill="none"
					stroke-width="1"
					stroke-linejoin="round"
					pointer-events="none"
					class="stroke-ink"
					transition:fade={{ duration: 150 }}
				/>
			{/if}
		</svg>
	</div>

	{#if hoveredMonth !== null}
		<div
			class="pointer-events-none absolute bottom-full z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-page px-3 py-2 text-xs shadow-lg"
			style="left: {popoverLeft}px"
			bind:clientWidth={popoverWidth}
			transition:fade={{ duration: 150 }}
		>
			<p class="font-medium text-ink">{MONTHS[hoveredMonth]} {props.year}</p>
			<p class="mt-0.5 text-ink-soft">
				{months[hoveredMonth].total}
				{months[hoveredMonth].total === 1 ? 'contribution' : 'contributions'}
			</p>
		</div>
	{/if}
</div>
