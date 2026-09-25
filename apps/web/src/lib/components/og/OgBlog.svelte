<script lang="ts">
	import OgFrame from './OgFrame.svelte';
	import { colors, titleSize, truncate } from './og';

	interface Props {
		title: string;
		description: string;
		date: string;
		tags: string[];
	}

	let { title, description, date, tags }: Props = $props();
</script>

<OgFrame label="Blog post" path="ar7al.com/blog">
	<div style="display: flex; font-size: {titleSize(title)}px; line-height: 1.15; color: {colors.ink};">
		{title}
	</div>
	<div style="display: flex; margin-top: 24px; font-size: 24px; line-height: 1.5; color: {colors.inkSoft};">
		{truncate(description, 200)}
	</div>
	<div style="display: flex; margin-top: 28px; font-size: 22px; color: {colors.inkMute};">
		{new Date(date).toLocaleDateString('en-US', { dateStyle: 'medium' })} · {tags.slice(0, 3).join(' · ')}
	</div>
</OgFrame>
