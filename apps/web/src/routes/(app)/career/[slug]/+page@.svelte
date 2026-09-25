<script lang="ts">
	import type { Component } from 'svelte';
	import ActionLink from '$lib/components/ActionLink.svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import CompanyLogo from '$lib/components/CompanyLogo.svelte';
	import PrevNext from '$lib/components/PrevNext.svelte';
	import SignOff from '$lib/components/SignOff.svelte';
	import TechIcons from '$lib/components/TechIcons.svelte';
	import {
		formatDateRange,
		calculateDuration,
		type Experience,
		type ExperienceMetadata
	} from '$lib/data/experiences';

	let props: {
		data: {
			content: Component;
			meta: ExperienceMetadata;
			slug: string;
			origin: string;
			previous: Experience | null;
			next: Experience | null;
		};
	} = $props();

	let meta = $derived(props.data.meta);
	let url = $derived(`${props.data.origin}/career/${props.data.slug}`);
	let image = $derived(`${props.data.origin}/career/${props.data.slug}/social.png`);
	let title = $derived(`${meta.title} at ${meta.company} - Abdelilah Ouaadouch`);
	let description = $derived(meta.description);
	let personId = $derived(`${props.data.origin}#person`);
	let websiteId = $derived(`${props.data.origin}#website`);
	let webpageId = $derived(`${url}#webpage`);
	let breadcrumbId = $derived(`${url}#breadcrumb`);
	let roleId = $derived(`${url}#role`);
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

<div class="min-h-screen w-screen bg-page px-4 pb-8">
	<div class="m-auto w-full max-w-3xl">
		<BackLink href="/career" label="Career" />

		<div class="space-y-12">
			<header class="space-y-4">
				<div class="flex items-center gap-4">
					<CompanyLogo company={meta.company} logo={meta.logo} size="lg" />
					<div class="min-w-0">
						<h1 class="font-display text-3xl leading-tight font-semibold text-ink md:text-4xl">
							{meta.company}
						</h1>
						<p class="mt-1 text-ink-soft">{meta.title}</p>
					</div>
				</div>
				<p class="text-sm text-ink-mute">
					{formatDateRange(meta.startDate, meta.endDate)} · {calculateDuration(
						meta.startDate,
						meta.endDate
					)} · {meta.type} · {meta.location} · {meta.locationType}
				</p>
				<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-2">
					<TechIcons tech={meta.technologies} />
					{#if meta.companyWebsite || meta.companyUrl}
						<div class="flex items-center gap-5">
							{#if meta.companyWebsite}
								<ActionLink href={meta.companyWebsite}>Website</ActionLink>
							{/if}
							{#if meta.companyUrl}
								<ActionLink href={meta.companyUrl}>LinkedIn</ActionLink>
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
					label="More roles"
					previous={props.data.previous && {
						href: `/career/${props.data.previous.slug}`,
						title: props.data.previous.company
					}}
					next={props.data.next && {
						href: `/career/${props.data.next.slug}`,
						title: props.data.next.company
					}}
				/>
				<SignOff message="Want to know more about this role?" />
			</footer>
		</div>
	</div>
</div>
