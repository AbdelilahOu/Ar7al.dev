<script lang="ts">
	import OgFrame from './OgFrame.svelte';
	import { colors, iconFor } from './og';

	interface Props {
		projects: { title: string; tech: string[] }[];
	}

	let { projects }: Props = $props();
</script>

<OgFrame label="Projects" path="ar7al.dev/projects">
	<div style="display: flex; font-size: 52px; line-height: 1.1; color: {colors.ink};">
		Software I've built
	</div>
	<div style="display: flex; margin-top: 12px; font-size: 24px; color: {colors.inkSoft};">
		Cross-platform apps, web platforms, and developer tools
	</div>

	<div style="display: flex; gap: 40px; margin-top: 44px; padding-top: 32px; border-top: 1px solid {colors.line};">
		{#each projects as project}
			<div style="display: flex; flex-direction: column; flex: 1;">
				<div style="display: flex; font-size: 32px; color: {colors.ink};">{project.title}</div>
				<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px;">
					{#each project.tech as tech}
						{@const src = iconFor(tech)}
						{#if src}
							<img {src} width="28" height="28" alt="" />
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</OgFrame>
