<script lang="ts">
	import type { Component } from 'svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';
	import { formatDateRange, calculateDuration, type ExperienceMetadata } from '$lib/data/experiences';

	let props: { data: { content: Component; meta: ExperienceMetadata; slug: string; origin: string } } = $props();

	const meta = props.data.meta;
	const url = `${props.data.origin}/career/${props.data.slug}`;
	const image = `${props.data.origin}/career/${props.data.slug}/social.png`;
	const title = `${meta.title} at ${meta.company} - Abdelilah Ouaadouch`;
	const description = meta.description;
	const personId = `${props.data.origin}#person`;
	const websiteId = `${props.data.origin}#website`;
	const webpageId = `${url}#webpage`;
	const breadcrumbId = `${url}#breadcrumb`;
	const roleId = `${url}#role`;
	const normalizeDate = (value: string | null) => {
		if (!value) return undefined;
		if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
		if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
		if (/^\d{4}$/.test(value)) return `${value}-01-01`;
		const parsed = new Date(value);
		if (Number.isNaN(parsed.getTime())) return undefined;
		return parsed.toISOString().slice(0, 10);
	};
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
				"@type": "OrganizationRole",
				"@id": roleId,
				"roleName": meta.title,
				"description": meta.description,
				"startDate": normalizeDate(meta.startDate),
				...(meta.endDate ? { "endDate": normalizeDate(meta.endDate) } : {}),
				"memberOf": {
					"@type": "Organization",
					"name": meta.company,
					...(meta.companyUrl ? { "url": meta.companyUrl } : {})
				},
				"location": {
					"@type": "Place",
					"address": meta.location
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
					"@id": roleId
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
						"name": "Career",
						"item": `${props.data.origin}/career`
					},
					{
						"@type": "ListItem",
						"position": 3,
						"name": `${meta.title} at ${meta.company}`,
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
				href="/career"
				class="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
			>
				<span>{"<-"}</span>
				<span>Back to Career</span>
			</a>
		</nav>

		<div class="space-y-8">

		<header class="space-y-4">
			<h1 class="font-display text-3xl font-semibold text-white md:text-4xl">
				{meta.title}
			</h1>
			<div class="flex flex-wrap items-center gap-2 text-lg text-gray-300">
				{#if meta.companyWebsite || meta.companyUrl}
					<a
						href={meta.companyWebsite ?? meta.companyUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-400 hover:text-blue-300 transition-colors"
					>
						{meta.company}
					</a>
				{:else}
					<span>{meta.company}</span>
				{/if}
				<span>-</span>
				<span>{meta.type}</span>
			</div>
			<div class="text-gray-400">
				<span>{formatDateRange(meta.startDate, meta.endDate)}</span>
				<span class="mx-2">-</span>
				<span>{calculateDuration(meta.startDate, meta.endDate)}</span>
			</div>
			<div class="text-gray-400">
				{meta.location} - {meta.locationType}
			</div>
			<div class="flex flex-wrap gap-2">
				{#each meta.technologies as tech}
					<span class="bg-neutral-700 px-3 py-1 text-sm text-white">{tech}</span>
				{/each}
			</div>
		</header>

		{#if meta.companyWebsite || meta.companyUrl}
			<section class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
				{#if meta.companyWebsite}
					<a
						href={meta.companyWebsite}
						target="_blank"
						rel="noopener noreferrer"
						class="corner-brackets inline-flex w-fit items-center bg-[#101010] px-3 py-2 text-sm text-blue-400 transition-colors hover:text-blue-300 md:px-4 md:text-base"
					>
						View Company Website
					</a>
				{/if}
				{#if meta.companyUrl}
					<a
						href={meta.companyUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="corner-brackets inline-flex w-fit items-center bg-[#101010] px-3 py-2 text-sm text-blue-400 transition-colors hover:text-blue-300 md:px-4 md:text-base"
					>
						View Company on LinkedIn
					</a>
				{/if}
			</section>
		{/if}

		<article class="prose prose-invert prose-lg max-w-none">
			<props.data.content />
		</article>

		<section class="space-y-4">
			<h2 class="text-xl md:text-2xl font-bold text-white">
				<span>$</span> Tech Stack
			</h2>
			<SkillsGrid skills={meta.technologies} />
		</section>

		<footer class="space-y-6 border-t border-neutral-800 pt-8">
			<div class="corner-brackets bg-[#101010] p-5">
				<p class="text-gray-300">
					Want to learn more about my experience? Connect with me on
					<a
						href="https://www.linkedin.com/in/ar7al"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-400 hover:text-blue-300"
					>
						LinkedIn
					</a>
					or
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
