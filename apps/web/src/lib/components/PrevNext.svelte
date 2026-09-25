<script lang="ts">
	import Arrow from '$lib/components/Arrow.svelte';

	interface Link {
		href: string;
		title: string;
	}

	interface Props {
		previous: Link | null;
		next: Link | null;
		label: string;
	}

	let { previous, next, label }: Props = $props();
</script>

{#if previous || next}
	<nav class="group/list grid gap-8 sm:grid-cols-2" aria-label={label}>
		{#if previous}
			<a
				href={previous.href}
				class="group block transition-opacity duration-300 group-hover/list:opacity-40 hover:opacity-100"
			>
				<span class="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-mute">
					<Arrow
						direction="left"
						class="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
					/>
					Previous
				</span>
				<span class="mt-2 block text-lg leading-snug text-ink">{previous.title}</span>
			</a>
		{:else}
			<div></div>
		{/if}
		{#if next}
			<a
				href={next.href}
				class="group block transition-opacity duration-300 group-hover/list:opacity-40 hover:opacity-100 sm:text-right"
			>
				<span
					class="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-mute sm:justify-end"
				>
					Next
					<Arrow
						direction="right"
						class="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
					/>
				</span>
				<span class="mt-2 block text-lg leading-snug text-ink">{next.title}</span>
			</a>
		{/if}
	</nav>
{/if}
