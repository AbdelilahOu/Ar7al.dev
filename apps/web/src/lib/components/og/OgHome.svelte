<script lang="ts">
	import OgFrame from './OgFrame.svelte';
	import { colors, iconFor } from './og';

	const stack = ['Go', 'TypeScript', 'PostgreSQL', 'Docker', 'Next.js', 'Tauri'];
</script>

<OgFrame label="Portfolio" path="ar7al.com" showName={false}>
	<div style="display: flex; font-size: 80px; line-height: 1.05; color: {colors.ink};">
		Abdelilah Ouaadouch
	</div>
	<div style="display: flex; margin-top: 20px; font-size: 34px; color: {colors.inkSoft};">
		Senior Backend Engineer
	</div>
	<div style="display: flex; margin-top: 16px; font-size: 24px; color: {colors.inkMute};">
		Backend systems, end to end · currently at DEV-UP
	</div>
	<div style="display: flex; flex-wrap: wrap; gap: 32px; margin-top: 52px;">
		{#each stack as skill}
			<div style="display: flex; align-items: center; gap: 12px; font-size: 24px; color: {colors.inkSoft};">
				<img src={iconFor(skill)} width="30" height="30" alt="" />
				{skill}
			</div>
		{/each}
	</div>
</OgFrame>
