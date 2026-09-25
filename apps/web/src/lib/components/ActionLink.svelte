<script lang="ts">
	import type { Snippet } from 'svelte';
	import Arrow from '$lib/components/Arrow.svelte';

	interface Props {
		href: string;
		children: Snippet;
	}

	let { href, children }: Props = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="group inline-flex items-center gap-1 text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-mute"
>
	{@render children()}
	<Arrow
		direction="up-right"
		class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
	/>
</a>
