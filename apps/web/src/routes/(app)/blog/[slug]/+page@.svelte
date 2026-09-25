<script lang="ts">
	import type { Component } from 'svelte';
	import type { Post, PostMetadata } from '$lib/types';

	let props: {
		data: {
			content: Component;
			meta: PostMetadata;
			slug: string;
			origin: string;
			previous: Post | null;
			next: Post | null;
		};
	} = $props();

	let meta = $derived(props.data.meta);
	let url = $derived(`${props.data.origin}/blog/${props.data.slug}`);
	let image = $derived(`${props.data.origin}/blog/${props.data.slug}/social.png`);
	let title = $derived(`${props.data.meta.title} - Abdelilah Ouaadouch`);
	let description = $derived(meta.seoDescription ?? meta.description);
	let keywords = $derived((meta.seoKeywords && meta.seoKeywords.length > 0) ? meta.seoKeywords : meta.tags);
	let personId = $derived(`${props.data.origin}#person`);
	let websiteId = $derived(`${props.data.origin}#website`);
	let blogId = $derived(`${props.data.origin}/blog#blog`);
	let webpageId = $derived(`${url}#webpage`);
	let breadcrumbId = $derived(`${url}#breadcrumb`);
	let postingId = $derived(`${url}#blogposting`);

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

<div class="min-h-screen w-screen bg-page px-4 pb-8">
	<div class="m-auto w-full max-w-3xl">
		<nav class="flex items-center gap-6 text-sm md:text-base bg-page sticky top-0 z-50 py-6">
			<a
				href="/blog"
				class="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
			>
				<span>{"<-"}</span>
				<span>Back to Blog</span>
			</a>
		</nav>

		<div class="space-y-8">
		<header class="space-y-4">
			<h1 class="font-display text-3xl font-semibold text-ink md:text-4xl">
				{meta.title}
			</h1>
			<div class="flex flex-wrap items-center gap-4 text-sm text-ink-soft">
				<time>{formatDate(meta.date)}</time>
				<div class="flex flex-wrap gap-2">
					{#each meta.tags as tag}
						<span class="rounded-sm bg-line px-2 py-1 text-xs text-ink-soft">{tag}</span>
					{/each}
				</div>
			</div>
		</header>

		<article class="prose prose-invert prose-lg max-w-none">
			<props.data.content />
		</article>

		<footer class="space-y-6 border-t border-line pt-8">
			{#if props.data.previous || props.data.next}
				<nav class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{#if props.data.previous}
						<a
							href="/blog/{props.data.previous.slug}"
							class="rounded-md bg-card p-5 transition-colors hover:bg-raised"
						>
							<span class="flex items-center gap-2 text-sm text-ink-mute">
								<span>{'<-'}</span>
								<span>Previous</span>
							</span>
							<span class="mt-2 block text-ink">{props.data.previous.title}</span>
						</a>
					{:else}
						<div></div>
					{/if}
					{#if props.data.next}
						<a
							href="/blog/{props.data.next.slug}"
							class="rounded-md bg-card p-5 text-right transition-colors hover:bg-raised"
						>
							<span class="flex items-center justify-end gap-2 text-sm text-ink-mute">
								<span>Next</span>
								<span>{'->'}</span>
							</span>
							<span class="mt-2 block text-ink">{props.data.next.title}</span>
						</a>
					{:else}
						<div></div>
					{/if}
				</nav>
			{/if}
			<div class="rounded-md bg-card p-5">
				<p class="text-ink-soft">
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
		color: var(--color-ink);
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.prose h3) {
		color: var(--color-ink);
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose p) {
		color: var(--color-ink-soft);
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
		color: var(--color-ink-soft);
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
		color: var(--color-ink);
		font-weight: 600;
	}

	:global(.prose code) {
		background-color: var(--color-raised);
		border-radius: 0.25rem;
		padding: 0.125rem 0.375rem;
		font-size: 0.875em;
		color: var(--color-ink);
	}

	:global(.prose pre) {
		position: relative;
		background-color: var(--color-card) !important;
		border-radius: 0.375rem;
		padding: 1.25rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	:global(.prose pre code) {
		background-color: transparent;
		padding: 0;
	}

	:global(.prose blockquote) {
		border-left: 4px solid var(--color-ink-faint);
		padding-left: 1rem;
		color: var(--color-ink-mute);
		font-style: italic;
	}

	:global(.prose hr) {
		border-color: var(--color-line);
		margin: 2rem 0;
	}

	:global(.prose svg) {
		display: block;
		margin: 2rem 0;
		max-width: 100%;
	}
</style>
