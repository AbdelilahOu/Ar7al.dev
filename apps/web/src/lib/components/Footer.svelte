<script lang="ts">
	import Arrow from '$lib/components/Arrow.svelte';

	const links = [
		{ label: 'GitHub', href: 'https://github.com/AbdelilahOu' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ar7al' },
		{ label: 'X / Twitter', href: 'https://x.com/Abdelilah4dev' },
		{ label: 'Email', href: 'mailto:abdelilah4dev@gmail.com' }
	];
</script>

<footer
	class="flex flex-col gap-5 border-t border-line py-8 text-xs uppercase tracking-widest text-ink-mute sm:flex-row sm:items-center sm:justify-between"
>
	<p>&copy; {new Date().getFullYear()} · Abdelilah Ouaadouch</p>
	<nav aria-label="Elsewhere" class="flex flex-wrap gap-x-5 gap-y-2">
		{#each links as link}
			<a
				href={link.href}
				target={link.href.startsWith('mailto:') ? undefined : '_blank'}
				rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
				class="group inline-flex items-center gap-1 underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-mute"
			>
				{link.label}
				<Arrow
					direction="up-right"
					class="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				/>
			</a>
		{/each}
	</nav>
</footer>
