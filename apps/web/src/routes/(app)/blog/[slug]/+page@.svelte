<script lang="ts">
	import type { Component } from 'svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import PrevNext from '$lib/components/PrevNext.svelte';
	import SignOff from '$lib/components/SignOff.svelte';
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
		<BackLink href="/blog" label="Blog" />

		<div class="space-y-12">
			<header class="space-y-4">
				<p class="text-sm text-ink-mute">
					<time datetime={meta.date}>{formatDate(meta.date)}</time>
					{#if meta.tags.length > 0}
						<span>· {meta.tags.join(' · ')}</span>
					{/if}
				</p>
				<h1 class="font-display text-3xl leading-tight font-semibold text-ink md:text-4xl">
					{meta.title}
				</h1>
				<p class="text-lg text-ink-soft">{meta.description}</p>
			</header>

			<article class="prose">
				<props.data.content />
			</article>

			<footer class="space-y-10 border-t border-line pt-10">
				<PrevNext
					label="More posts"
					previous={props.data.previous && {
						href: `/blog/${props.data.previous.slug}`,
						title: props.data.previous.title
					}}
					next={props.data.next && {
						href: `/blog/${props.data.next.slug}`,
						title: props.data.next.title
					}}
				/>
				<SignOff message="Thanks for reading." />
			</footer>
		</div>
	</div>
</div>
