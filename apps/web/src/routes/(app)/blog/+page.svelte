<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';
	import type { Post } from '$lib/types';

	let props: { data: { posts: Post[]; origin: string } } = $props();

	const title = 'Blog - Abdelilah Ouaadouch';
	const description =
		'Technical articles about Go, Rust, TypeScript, and fullstack development. Tips, tutorials, and insights from a fullstack developer.';
	const url = `${props.data.origin}/blog`;
	const image = `${props.data.origin}/blog/social.png`;
	const personId = `${props.data.origin}#person`;
	const websiteId = `${props.data.origin}#website`;
	const webpageId = `${url}#webpage`;
	const breadcrumbId = `${url}#breadcrumb`;
	const blogId = `${url}#blog`;
	const blogPosts = props.data.posts.map((post) => ({
		"@type": "BlogPosting",
		"@id": `${props.data.origin}/blog/${post.slug}#blogposting`,
		"headline": post.title,
		"description": post.description,
		"datePublished": post.date,
		"author": {
			"@id": personId
		},
		"url": `${props.data.origin}/blog/${post.slug}`,
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
		href={`${props.data.origin}/rss.xml`}
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
				"jobTitle": "Fullstack Developer",
				"url": `${props.data.origin}`,
				"image": `${props.data.origin}/social.png`,
				"sameAs": [
					"https://www.linkedin.com/in/ar7al/",
					"https://github.com/AbdelilahOu",
					"https://x.com/Abdelilah4dev"
				]
			},
			{
				"@type": "WebSite",
				"@id": websiteId,
				"name": "Abdelilah Ouaadouch - Fullstack Developer Portfolio",
				"url": `${props.data.origin}`,
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
						"item": `${props.data.origin}`
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
	<h1 class="font-display text-3xl font-semibold text-white md:text-4xl">
		Blog
		<span class="block text-xl font-normal normal-case text-gray-300 md:text-2xl">
			Technical Articles & Tutorials
		</span>
	</h1>
	<p class="text-base text-gray-300 md:text-lg">
		Thoughts on Go, Rust, TypeScript, and building software that works. Deep dives into
		technical challenges, tutorials, and lessons learned from real projects.
	</p>
</header>

<section class="space-y-4">
	<h2 class="text-xl font-bold text-white md:text-2xl">
		<span>$</span> Blog Posts
	</h2>

	{#if props.data.posts.length > 0}
		<div class="space-y-4">
			{#each props.data.posts as post}
				<BlogCard {post} />
			{/each}
		</div>
	{:else}
		<div class="corner-brackets bg-[#101010] p-8 text-center">
			<p class="text-gray-400">
				No posts yet. Check back soon for technical articles and tutorials.
			</p>
			<p class="mt-2 text-sm text-gray-500">
				In the meantime, check out my
				<a href="https://github.com/AbdelilahOu" class="text-blue-400 hover:text-blue-300">
					GitHub
				</a>
				for code and projects.
			</p>
		</div>
	{/if}
</section>

<section class="space-y-4">
	<h2 class="text-xl font-bold text-white md:text-2xl">
		<span>$</span> Topics
	</h2>
	<SkillsGrid skills={['Go/Golang', 'Rust', 'TypeScript', 'APIs', 'System Design', 'Developer Tools', 'Database Optimization', 'Desktop Apps']} />
</section>
