<script lang="ts">
	import type { Component } from 'svelte';
	import ActionLink from '$lib/components/ActionLink.svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import PrevNext from '$lib/components/PrevNext.svelte';
	import SignOff from '$lib/components/SignOff.svelte';
	import TechIcons from '$lib/components/TechIcons.svelte';
	import type { Project, ProjectMetadata } from '$lib/data/projects';

	let props: {
		data: {
			content: Component;
			meta: ProjectMetadata;
			slug: string;
			origin: string;
			previous: Project | null;
			next: Project | null;
		};
	} = $props();

	let meta = $derived(props.data.meta);
	let url = $derived(`${props.data.origin}/projects/${props.data.slug}`);
	let image = $derived(`${props.data.origin}/projects/${props.data.slug}/social.png`);
	let title = $derived(`${meta.title} - Abdelilah Ouaadouch`);
	let description = $derived(meta.description);
	let personId = $derived(`${props.data.origin}#person`);
	let websiteId = $derived(`${props.data.origin}#website`);
	let webpageId = $derived(`${url}#webpage`);
	let breadcrumbId = $derived(`${url}#breadcrumb`);
	let projectId = $derived(`${url}#software`);
	let created = $derived(
		new Date(meta.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
	);
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

<div class="min-h-screen w-screen bg-page px-4 pb-8">
	<div class="m-auto w-full max-w-3xl">
		<BackLink href="/projects" label="Projects" />

		<div class="space-y-12">
			<header class="space-y-4">
				<p class="text-sm text-ink-mute">
					<time datetime={meta.createdAt}>{created}</time>
				</p>
				<h1 class="font-display text-3xl leading-tight font-semibold text-ink md:text-4xl">
					{meta.title}
				</h1>
				<p class="text-lg text-ink-soft">{meta.description}</p>
				<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-2">
					<TechIcons tech={meta.tech} />
					{#if meta.github || meta.web}
						<div class="flex items-center gap-5">
							{#if meta.github}
								<ActionLink href={meta.github}>GitHub</ActionLink>
							{/if}
							{#if meta.web}
								<ActionLink href={meta.web}>Live demo</ActionLink>
							{/if}
						</div>
					{/if}
				</div>
			</header>

			<article class="prose">
				<props.data.content />
			</article>

			<footer class="space-y-10 border-t border-line pt-10">
				<PrevNext
					label="More projects"
					previous={props.data.previous && {
						href: `/projects/${props.data.previous.slug}`,
						title: props.data.previous.title
					}}
					next={props.data.next && {
						href: `/projects/${props.data.next.slug}`,
						title: props.data.next.title
					}}
				/>
				<SignOff message="Thanks for checking this out." />
			</footer>
		</div>
	</div>
</div>
