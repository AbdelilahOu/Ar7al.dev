<script lang="ts">
	import OgFrame from './OgFrame.svelte';
	import { colors, truncate } from './og';

	interface Props {
		posts: { title: string; date: string }[];
	}

	let { posts }: Props = $props();
</script>

<OgFrame label="Blog" path="ar7al.dev/blog">
	<div style="display: flex; font-size: 52px; line-height: 1.1; color: {colors.ink};">Writing</div>
	<div style="display: flex; margin-top: 12px; font-size: 24px; color: {colors.inkSoft};">
		Thoughts on Go, Rust, TypeScript, and building software that works
	</div>

	<div style="display: flex; flex-direction: column; margin-top: 30px;">
		{#each posts as post, i}
			<div
				style="display: flex; justify-content: space-between; align-items: baseline; gap: 32px; padding: 12px 0; border-top: 1px solid {i ? colors.line : 'transparent'};"
			>
				<span style="display: flex; font-size: 26px; color: {colors.ink};">{truncate(post.title, 46)}</span>
				<span style="display: flex; font-size: 20px; color: {colors.inkMute};">
					{new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}
				</span>
			</div>
		{/each}
	</div>
</OgFrame>
