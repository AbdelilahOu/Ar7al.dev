<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/career', label: 'Career' },
		{ href: '/blog', label: 'Blog' }
	];

</script>

<nav class="flex items-center sticky bg-page top-0 z-50 gap-6 py-6 text-sm md:text-base">
    {#each links as link}
		<a
			href={link.href}
			class="transition-colors {page.url.pathname === link.href
				? 'text-ink border-ink'
				: 'text-ink-soft hover:text-ink'}"
		>
			{link.label}
		</a>
	{/each}
</nav>
