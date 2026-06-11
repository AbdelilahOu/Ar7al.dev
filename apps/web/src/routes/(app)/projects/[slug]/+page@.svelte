<script lang="ts">
	import type { Component } from 'svelte';
	import type { ProjectMetadata } from '$lib/data/projects';

	let props: { data: { content: Component; meta: ProjectMetadata; slug: string; origin: string } } = $props();

	const meta = props.data.meta;
	const url = `${props.data.origin}/projects/${props.data.slug}`;
	const image = `${props.data.origin}/projects/${props.data.slug}/social.png`;
	const title = `${meta.title} - Abdelilah Ouaadouch`;
	const description = meta.description;
	const personId = `${props.data.origin}#person`;
	const websiteId = `${props.data.origin}#website`;
	const webpageId = `${url}#webpage`;
	const breadcrumbId = `${url}#breadcrumb`;
	const projectId = `${url}#software`;
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
				"@type": "SoftwareApplication",
				"@id": projectId,
				"name": meta.title,
				"description": meta.description,
				"applicationCategory": "DeveloperApplication",
				"operatingSystem": "Cross-platform",
				"url": url,
				"author": {
					"@id": personId
				},
				"creator": {
					"@id": personId
				},
				"dateCreated": meta.createdAt,
				"softwareRequirements": meta.tech,
				...(meta.github ? { "codeRepository": meta.github } : {}),
				...(meta.web ? { "sameAs": [meta.web] } : {}),
				"offers": {
					"@type": "Offer",
					"price": "0",
					"priceCurrency": "USD"
				}
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
					"@id": projectId
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
						"name": "Projects",
						"item": `${props.data.origin}/projects`
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
		<nav class="flex items-center gap-6 text-sm md:text-base py-6 bg-[#0d0d0d] sticky top-0 z-50">
			<a
				href="/projects"
				class="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
			>
				<span>{"<-"}</span>
				<span>Back to Projects</span>
			</a>
		</nav>

		<div class="space-y-8">

		<header class="space-y-4">
			<h1 class="font-display text-3xl font-semibold text-white md:text-4xl">
				{meta.title}
			</h1>
			<p class="text-base md:text-lg text-gray-300">
				{meta.description}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each meta.tech as tech}
					<span class="bg-neutral-700 px-3 py-1 text-sm text-white">{tech}</span>
				{/each}
			</div>
		</header>

		{#if meta.github || meta.web}
			<section class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
				{#if meta.github}
					<a
						href={meta.github}
						target="_blank"
						rel="noopener noreferrer"
						class="corner-brackets inline-flex w-fit items-center bg-[#101010] px-3 py-2 text-sm text-blue-400 transition-colors hover:text-blue-300 md:px-4 md:text-base"
					>
						View on GitHub
					</a>
				{/if}
				{#if meta.web}
					<a
						href={meta.web}
						target="_blank"
						rel="noopener noreferrer"
						class="corner-brackets inline-flex w-fit items-center bg-[#101010] px-3 py-2 text-sm text-blue-400 transition-colors hover:text-blue-300 md:px-4 md:text-base"
					>
						View Live Demo
					</a>
				{/if}
			</section>
		{/if}

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
		background-color: #101010 !important;
		padding: 1.25rem;
		overflow-x: auto;
		margin-bottom: 1rem;
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
