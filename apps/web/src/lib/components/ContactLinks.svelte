<script lang="ts">
	import HoverArrow from '$lib/components/HoverArrow.svelte';

	const links = [
		{ label: 'Email', value: 'abdelilah4dev@gmail.com', href: 'mailto:abdelilah4dev@gmail.com' },
		{ label: 'LinkedIn', value: 'Abdelilah Ouaadouch', href: 'https://www.linkedin.com/in/ar7al/' },
		{ label: 'GitHub', value: '@AbdelilahOu', href: 'https://github.com/AbdelilahOu' },
		{ label: 'X / Twitter', value: '@Abdelilah4dev', href: 'https://x.com/Abdelilah4dev' }
	];
</script>

<ul class="group/list space-y-3">
	{#each links as link}
		<li>
			<a
				href={link.href}
				title={link.value}
				target={link.href.startsWith('mailto:') ? undefined : '_blank'}
				rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
				class="group grid grid-cols-[6.5rem_1fr] items-center gap-x-4 transition-opacity duration-300 group-hover/list:opacity-40 hover:opacity-100"
			>
				<span class="text-xs uppercase tracking-widest text-ink-mute">{link.label}</span>
				<span class="flex min-w-0 items-center gap-2 text-sm text-ink-soft transition-colors group-hover:text-ink">
					<span class="truncate">{link.value}</span>
					<HoverArrow />
				</span>
			</a>
		</li>
	{/each}
</ul>
