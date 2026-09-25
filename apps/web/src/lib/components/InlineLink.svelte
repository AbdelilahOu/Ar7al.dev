<!-- Underlined external link for use inside a sentence. -->
<script lang="ts">
	import type { Snippet } from 'svelte';

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
	class="text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-mute"
	>{@render children()}</a
>
