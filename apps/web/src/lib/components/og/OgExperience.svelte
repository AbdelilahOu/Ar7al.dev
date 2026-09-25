<script lang="ts">
	import OgFrame from './OgFrame.svelte';
	import OgLogo from './OgLogo.svelte';
	import { colors, iconFor, truncate } from './og';

	interface Props {
		title: string;
		company: string;
		description: string;
		technologies: string[];
		logo?: string;
		meta: string;
	}

	let { title, company, description, technologies, logo, meta }: Props = $props();
</script>

<OgFrame label="Experience" path="ar7al.com/career">
	<div style="display: flex; align-items: center; gap: 28px;">
		<OgLogo {company} {logo} size={76} />
		<div style="display: flex; flex-direction: column;">
			<span style="display: flex; font-size: 52px; line-height: 1.1; color: {colors.ink};">{company}</span>
			<span style="display: flex; margin-top: 8px; font-size: 28px; color: {colors.inkSoft};">{title}</span>
		</div>
	</div>
	<div style="display: flex; margin-top: 24px; font-size: 24px; line-height: 1.5; color: {colors.inkSoft};">
		{truncate(description, 150)}
	</div>
	<div style="display: flex; gap: 18px; margin-top: 28px;">
		{#each technologies as tech}
			{@const src = iconFor(tech)}
			{#if src}
				<img {src} width="34" height="34" alt="" />
			{/if}
		{/each}
	</div>
	<div style="display: flex; margin-top: 24px; font-size: 20px; color: {colors.inkMute};">{meta}</div>
</OgFrame>
