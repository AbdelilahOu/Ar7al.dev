<script lang="ts">
	interface Props {
		direction: 'left' | 'right' | 'up-right';
		class?: string;
	}

	let { direction, class: className = '' }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	class="shrink-0 {className}"
>
	{#if direction === 'left'}
		<path d="m12 19-7-7 7-7" />
		<path d="M19 12H5" />
	{:else if direction === 'right'}
		<path d="M5 12h14" />
		<path d="m12 5 7 7-7 7" />
	{:else}
		<path d="M7 7h10v10" />
		<path d="M7 17 17 7" />
	{/if}
</svg>
