<script lang="ts">
	import InlineLink from '$lib/components/InlineLink.svelte';

	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<p class="text-sm text-ink-mute">
	{message} Find me on
	<InlineLink href="https://x.com/Abdelilah4dev">X</InlineLink>
	or
	<InlineLink href="https://www.linkedin.com/in/ar7al">LinkedIn</InlineLink>.
</p>
