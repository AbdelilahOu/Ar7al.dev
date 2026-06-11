<script lang="ts">
	import type { Component } from 'svelte';
	import type { PostMetadata } from '$lib/types';

	let props: { data: { content: Component; meta: PostMetadata; slug: string; origin: string } } = $props();

	const meta = props.data.meta;
	const url = `${props.data.origin}/blog/${props.data.slug}`;
	const image = `${props.data.origin}/blog/${props.data.slug}/social.png`;
	const title = `${props.data.meta.title} - Abdelilah Ouaadouch`;
	const description = meta.seoDescription ?? meta.description;
	const keywords = (meta.seoKeywords && meta.seoKeywords.length > 0) ? meta.seoKeywords : meta.tags;
	const personId = `${props.data.origin}#person`;
	const websiteId = `${props.data.origin}#website`;
	const blogId = `${props.data.origin}/blog#blog`;
	const webpageId = `${url}#webpage`;
	const breadcrumbId = `${url}#breadcrumb`;
	const postingId = `${url}#blogposting`;

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content="Abdelilah Ouaadouch" />
	<meta property="og:locale" content="en_US" />
	<meta property="article:published_time" content={meta.date} />
	<meta property="article:author" content="Abdelilah Ouaadouch" />
	{#each meta.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}

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
				"url": `${props.data.origin}/blog`,
				"isPartOf": {
					"@id": websiteId
				},
				"author": {
					"@id": personId
				}
			},
			{
				"@type": "BlogPosting",
				"@id": postingId,
				"headline": meta.title,
				"description": description,
				"url": url,
				"datePublished": meta.date,
				"author": {
					"@id": personId
				},
				"publisher": {
					"@id": personId
				},
				"isPartOf": {
					"@id": blogId
				},
				"mainEntityOfPage": {
					"@id": webpageId
				},
				"image": {
					"@type": "ImageObject",
					"url": image
				},
				"keywords": keywords
			},
			{
				"@type": "WebPage",
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
					"@id": postingId
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
						"item": `${props.data.origin}/blog`
					},
					{
						"@type": "ListItem",
						"position": 3,
						"name": meta.title,
						"item": url
					}
				]
			}
		]
	})}</script>`}
</svelte:head>

<div class="min-h-screen w-screen bg-[#0d0d0d] px-4 pb-8">
	<div class="m-auto w-full max-w-3xl">
		<nav class="flex items-center gap-6 text-sm md:text-base bg-[#0d0d0d] sticky top-0 z-50 py-6">
			<a
				href="/blog"
				class="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
			>
				<span>{"<-"}</span>
				<span>Back to Blog</span>
			</a>
		</nav>

		<div class="space-y-8">
		<header class="space-y-4">
			<h1 class="font-display text-3xl font-semibold text-white md:text-4xl">
				{meta.title}
			</h1>
			<div class="flex flex-wrap items-center gap-4 text-sm text-gray-400">
				<time>{formatDate(meta.date)}</time>
				<div class="flex flex-wrap gap-2">
					{#each meta.tags as tag}
						<span class="bg-neutral-700 px-2 py-1 text-xs text-gray-300">{tag}</span>
					{/each}
				</div>
			</div>
		</header>

		<article class="prose prose-invert prose-lg max-w-none">
			<props.data.content />
		</article>

		<footer class="space-y-6 border-t border-neutral-800 pt-8">
			<div class="corner-brackets bg-[#101010] p-5">
				<p class="text-gray-300">
					Thanks for reading! If you found this helpful, feel free to share it or connect with me
					on
					<a
						href="https://x.com/Abdelilah4dev"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-400 hover:text-blue-300"
					>
						Twitter
					</a>.
				</p>
			</div>
		</footer>
		</div>
	</div>
</div>

<style>
	/* Markdown content styling */
	:global(.prose h2) {
		color: #fff;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.prose h3) {
		color: #fff;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose p) {
		color: #d1d5db;
		margin-bottom: 1rem;
		line-height: 1.75;
	}

	:global(.prose a) {
		color: #60a5fa;
	}

	:global(.prose a:hover) {
		color: #93c5fd;
	}

	:global(.prose ul),
	:global(.prose ol) {
		color: #d1d5db;
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	:global(.prose li) {
		margin-bottom: 0.5rem;
	}

	:global(.prose li::before) {
		content: '- ';
		margin-right: 0.25rem;
	}

	:global(.prose strong) {
		color: #fff;
		font-weight: 600;
	}

	:global(.prose code) {
		background-color: #202020;
		padding: 0.125rem 0.375rem;
		font-size: 0.875em;
		color: #f9fafb;
	}

	:global(.prose pre) {
		position: relative;
		background-color: #101010 !important;
		padding: 1.25rem;
		overflow-x: auto;
		margin-bottom: 1rem;
		--size: 13px;
		--width: 2px;
		--color: gray;
		/* Corner brackets as background on the element itself - stays fixed when scrolling */
		background-color: #101010;
		background-image:
			/* Top-left corner */
			linear-gradient(var(--color), var(--color)),
			linear-gradient(var(--color), var(--color)),
			/* Top-right corner */
			linear-gradient(var(--color), var(--color)),
			linear-gradient(var(--color), var(--color)),
			/* Bottom-left corner */
			linear-gradient(var(--color), var(--color)),
			linear-gradient(var(--color), var(--color)),
			/* Bottom-right corner */
			linear-gradient(var(--color), var(--color)),
			linear-gradient(var(--color), var(--color));
		background-size:
			var(--size) var(--width),
			var(--width) var(--size),
			var(--size) var(--width),
			var(--width) var(--size),
			var(--size) var(--width),
			var(--width) var(--size),
			var(--size) var(--width),
			var(--width) var(--size);
		background-position:
			0 0,
			0 0,
			100% 0,
			100% 0,
			0 100%,
			0 100%,
			100% 100%,
			100% 100%;
		background-repeat: no-repeat;
		/* background-attachment: scroll is default - keeps corners fixed to visible area */
	}

	:global(.prose pre code) {
		background-color: transparent;
		padding: 0;
	}

	:global(.prose blockquote) {
		border-left: 4px solid #4b5563;
		padding-left: 1rem;
		color: #9ca3af;
		font-style: italic;
	}

	:global(.prose hr) {
		border-color: #374151;
		margin: 2rem 0;
	}
</style>
