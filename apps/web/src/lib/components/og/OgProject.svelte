<script lang="ts">
	import OgFrame from './OgFrame.svelte';
	import { colors, iconFor, titleSize, truncate } from './og';

	interface Props {
		title: string;
		description: string;
		tech: string[];
		github: string;
		createdAt: string;
	}

	let { title, description, tech, github, createdAt }: Props = $props();

	let date = $derived(new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
	let meta = $derived(github ? `${date} · ${github.replace('https://', '')}` : date);
</script>

<OgFrame label="Project" path="ar7al.com/projects">
	<div style="display: flex; font-size: {titleSize(title)}px; line-height: 1.15; color: {colors.ink};">
		{title}
	</div>
	<div style="display: flex; margin-top: 22px; font-size: 24px; line-height: 1.5; color: {colors.inkSoft};">
		{truncate(description, 170)}
	</div>
	<div style="display: flex; gap: 18px; margin-top: 30px;">
		{#each tech as t}
			{@const src = iconFor(t)}
			{#if src}
				<img {src} width="36" height="36" alt="" />
			{/if}
		{/each}
	</div>
	<div style="display: flex; margin-top: 26px; font-size: 20px; color: {colors.inkMute};">{meta}</div>
</OgFrame>
