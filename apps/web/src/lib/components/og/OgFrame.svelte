<script lang="ts">
	import type { Snippet } from 'svelte';
	import { colors } from './og';

	interface Props {
		label: string;
		path: string;
		showName?: boolean;
		children: Snippet;
	}

	let { label, path, showName = true, children }: Props = $props();

	const greens = ['#0e4429', '#006d32', '#26a641', '#39d353'];
</script>

<div
	style="display: flex; flex-direction: column; width: 100%; height: 100%; padding: 72px 80px; background-color: {colors.page}; font-family: JetBrainsMono; color: {colors.ink};"
>
	<div
		style="display: flex; justify-content: space-between; font-size: 20px; letter-spacing: 4px; text-transform: uppercase; color: {colors.inkMute};"
	>
		<div style="display: flex; align-items: center; gap: 16px; color: {colors.inkSoft};">
			<div style="display: flex; gap: 4px;">
				{#each greens as green}
					<div style="display: flex; width: 14px; height: 14px; border-radius: 3px; background-color: {green};"></div>
				{/each}
			</div>
			{#if showName}
				<span>Abdelilah Ouaadouch</span>
			{/if}
		</div>
		<span>{label}</span>
	</div>

	<div style="display: flex; flex-direction: column; justify-content: center; flex: 1;">
		{@render children()}
	</div>

	<div
		style="display: flex; justify-content: space-between; align-items: center; padding-top: 28px; border-top: 1px solid {colors.line}; font-size: 22px; color: {colors.inkMute};"
	>
		<span style="color: {colors.inkSoft};">{path}</span>
		<span>@AbdelilahOu</span>
	</div>
</div>
