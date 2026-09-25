<!-- Borderless list row (winglee.dev style). Place inside a `group/list` container so hovering one row dims the others. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import HoverArrow from '$lib/components/HoverArrow.svelte';
	import TechIcons from '$lib/components/TechIcons.svelte';

	interface Props {
		href: string;
		title: string;
		linkTitle?: string;
		subtitle?: string;
		description?: string;
		meta?: string;
		tech?: string[];
		size?: 'lg' | 'md';
		icon?: Snippet;
	}

	let {
		href,
		title,
		linkTitle,
		subtitle,
		description,
		meta,
		tech,
		size = 'lg',
		icon
	}: Props = $props();
</script>

<a
	{href}
	title={linkTitle ?? title}
	class="group block transition-opacity duration-300 group-hover/list:opacity-40 hover:opacity-100"
>
	<div class="grid gap-y-3 sm:grid-cols-[1fr_auto] sm:gap-x-6">
		<div class="min-w-0">
			<div class="flex items-center gap-3">
				{@render icon?.()}
				<h3
					class="text-ink {size === 'lg'
						? 'text-2xl leading-none sm:text-3xl'
						: 'text-xl leading-snug sm:text-2xl'}"
				>
					{title}
				</h3>
				<HoverArrow />
			</div>
			{#if subtitle}
				<p class="mt-3 text-sm text-ink-soft">{subtitle}</p>
			{/if}
			{#if meta}
				<p class="mt-1 text-xs text-ink-mute sm:hidden">{meta}</p>
			{/if}
			{#if description}
				<p class="mt-3 max-w-xl text-[15px] leading-6 text-ink-soft">{description}</p>
			{/if}
			{#if tech?.length}
				<div class="mt-4">
					<TechIcons {tech} />
				</div>
			{/if}
		</div>
		{#if meta}
			<p class="hidden pt-1.5 text-right text-sm whitespace-nowrap text-ink-mute sm:block">{meta}</p>
		{/if}
	</div>
</a>
