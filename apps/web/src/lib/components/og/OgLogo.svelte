<script lang="ts">
	import { asset, colors } from './og';

	interface Props {
		company: string;
		logo?: string;
		size: number;
	}

	let { company, logo, size }: Props = $props();

	let src = $derived(asset(logo));
</script>

<div
	style="display: flex; align-items: center; justify-content: center; width: {size}px; height: {size}px; border-radius: {size / 5}px; border: 1px solid {colors.line}; background-color: #0f0f0f;"
>
	{#if src}
		<img {src} width={size * 0.6} height={size * 0.6} alt="" />
	{:else}
		<span style="display: flex; font-size: {size * 0.4}px; color: {colors.inkSoft};">{company[0]}</span>
	{/if}
</div>
