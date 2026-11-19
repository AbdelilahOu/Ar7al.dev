<script lang="ts">
	import InlineLink from '$lib/components/InlineLink.svelte';
	import PostRow from '$lib/components/PostRow.svelte';
	import SkillList from '$lib/components/SkillList.svelte';
	import type { Post } from '$lib/types';
	import { SITE_ORIGIN } from '$lib/site';

	let props: { data: { posts: Post[] } } = $props();

	const title = 'Blog - Abdelilah Ouaadouch';
	const description =
		'Technical articles about Go, Rust, TypeScript, and backend development. Tips, tutorials, and insights from a backend engineer.';
	const url = `${SITE_ORIGIN}/blog`;
	const image = `${SITE_ORIGIN}/blog/social.png`;
	const personId = `${SITE_ORIGIN}#person`;
	const websiteId = `${SITE_ORIGIN}#website`;
	const webpageId = `${url}#webpage`;
	const breadcrumbId = `${url}#breadcrumb`;
	const blogId = `${url}#blog`;
	const blogPosts = props.data.posts.map((post) => ({
		"@type": "BlogPosting",
		"@id": `${SITE_ORIGIN}/blog/${post.slug}#blogposting`,
		"headline": post.title,
		"description": post.description,
		"datePublished": post.date,
		"author": {
			"@id": personId
		},
		"url": `${SITE_ORIGIN}/blog/${post.slug}`,
		"keywords": post.tags
	}));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Abdelilah Ouaadouch's Blog"
		href={`${SITE_ORIGIN}/rss.xml`}
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content="Abdelilah Ouaadouch" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@Abdelilah4dev" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:creator" content="@Abdelilah4dev" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": personId,
				"name": "Abdelilah Ouaadouch",
				"alternateName": "Ar7al",
				"jobTitle": "Senior Backend Engineer",
				"url": `${SITE_ORIGIN}`,
				"image": `${SITE_ORIGIN}/social.png`,
				"sameAs": [
					"https://www.linkedin.com/in/ar7al/",
					"https://github.com/AbdelilahOu",
					"https://x.com/Abdelilah4dev"
				]
			},
			{
				"@type": "WebSite",
				"@id": websiteId,
				"name": "Abdelilah Ouaadouch - Senior Backend Engineer Portfolio",
				"url": `${SITE_ORIGIN}`,
				"publisher": {
					"@id": personId
				}
			},
			{
				"@type": "Blog",
				"@id": blogId,
				"name": "Abdelilah Ouaadouch's Blog",
				"description": description,
				"url": url,
				"isPartOf": {
					"@id": websiteId
				},
				"author": {
					"@id": personId
				},
				"blogPost": blogPosts
			},
			{
				"@type": "CollectionPage",
				"@id": webpageId,
				"name": title,
				"description": description,
				"url": url,
				"isPartOf": {
					"@id": websiteId
				},
				"about": {
					"@id": personId
				},
				"mainEntity": {
					"@id": blogId
				},
				"breadcrumb": {
					"@id": breadcrumbId
				},
				"primaryImageOfPage": {
					"@type": "ImageObject",
					"url": image
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": breadcrumbId,
				"itemListElement": [
					{
						"@type": "ListItem",
						"position": 1,
						"name": "Home",
						"item": `${SITE_ORIGIN}`
					},
					{
						"@type": "ListItem",
						"position": 2,
						"name": "Blog",
						"item": url
					}
				]
			}
		]
	})}</script>`}
</svelte:head>

<header class="space-y-4">
	<h1 class="font-display text-5xl italic text-ink md:text-6xl">
		Blog
		<span class="mt-1 block font-mono text-xl not-italic normal-case text-ink-soft md:text-2xl">
			Technical Articles & Tutorials
		</span>
	</h1>
	<p class="text-base text-ink-soft md:text-lg">
		Thoughts on Go, Rust, TypeScript, and building software that works. Deep dives into
		technical challenges, tutorials, and lessons learned from real projects.
	</p>
</header>

<section class="space-y-6">
	<h2 class="font-display text-3xl italic text-ink md:text-4xl">
		Blog Posts
	</h2>

	{#if props.data.posts.length > 0}
		<ul class="group/list space-y-8">
			{#each props.data.posts as post}
				<li><PostRow {post} /></li>
			{/each}
		</ul>
	{:else}
		<div class="space-y-2 text-sm">
			<p class="text-ink-soft">No posts yet. Check back soon for technical articles and tutorials.</p>
			<p class="text-ink-mute">In the meantime, check out my <InlineLink href="https://github.com/AbdelilahOu">GitHub</InlineLink> for code and projects.</p>
		</div>
	{/if}
</section>

<section class="space-y-4">
	<h2 class="font-display text-3xl italic text-ink md:text-4xl">
		Topics
	</h2>
	<SkillList skills={['Go/Golang', 'Rust', 'TypeScript', 'APIs', 'System Design', 'Developer Tools', 'Database Optimization', 'Desktop Apps']} />
</section>
