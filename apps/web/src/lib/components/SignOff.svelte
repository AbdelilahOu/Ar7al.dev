<script lang="ts">
	interface Props {
		message: string;
	}

	let { message }: Props = $props();

	const linkClass =
		'text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-mute';
</script>

<p class="text-sm text-ink-mute">
	{message} Find me on
	<a href="https://x.com/Abdelilah4dev" target="_blank" rel="noopener noreferrer" class={linkClass}>X</a>
	or
	<a
		href="https://www.linkedin.com/in/ar7al"
		target="_blank"
		rel="noopener noreferrer"
		class={linkClass}>LinkedIn</a
	>.
</p>
