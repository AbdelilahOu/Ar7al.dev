<script lang="ts">
	import ListRow from '$lib/components/ListRow.svelte';
	import type { Post } from '$lib/types';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();

	let published = $derived(
		new Date(post.date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})
	);
</script>

<ListRow
	href="/blog/{post.slug}"
	title={post.title}
	linkTitle="{post.title} - {post.description}"
	subtitle={post.tags.join(' · ')}
	description={post.description}
	meta={published}
	size="md"
/>
