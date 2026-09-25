<script lang="ts">
	import InlineLink from '$lib/components/InlineLink.svelte';
	import type { Project } from '$lib/data/projects';
	import ProjectRow from '$lib/components/ProjectRow.svelte';

	let props: { data: { projects: Project[]; origin: string } } = $props();

	const title = 'Projects - Abdelilah Ouaadouch';
	const description =
		'Portfolio of software projects including cross-platform apps, web applications, and developer tools. Built with Go, Rust, TypeScript, and modern frameworks.';
	const url = `${props.data.origin}/projects`;
	const image = `${props.data.origin}/projects/social.png`;
	const personId = `${props.data.origin}#person`;
	const websiteId = `${props.data.origin}#website`;
	const webpageId = `${url}#webpage`;
	const breadcrumbId = `${url}#breadcrumb`;
	const projectItems = props.data.projects.map((project, index) => ({
		"@type": "ListItem",
		"position": index + 1,
		"item": {
			"@type": "SoftwareSourceCode",
			"@id": `${props.data.origin}/projects/${project.slug}#software`,
			"name": project.title,
			"description": project.description,
			"url": `${props.data.origin}/projects/${project.slug}`,
			"dateCreated": project.createdAt,
			"programmingLanguage": project.tech,
			...(project.github ? { "codeRepository": project.github } : {}),
			...(project.web ? { "sameAs": [project.web] } : {})
		}
	}));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

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
				"name": "Abdelilah Ouaadouch - Senior Backend Engineer Portfolio",
				"url": `${props.data.origin}`,
				"publisher": {
					"@id": personId
				}
			},
			{
				"@type": "ItemList",
				"@id": `${url}#project-list`,
				"itemListElement": projectItems
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
					"@id": `${url}#project-list`
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
						"item": url
					}
				]
			}
		]
	})}</script>`}
</svelte:head>

<header class="space-y-4">
	<h1 class="font-display text-3xl font-semibold text-ink md:text-4xl">
		Projects
		<span class="block text-xl font-normal normal-case text-ink-soft md:text-2xl">
			Software I've Built
		</span>
	</h1>
	<p class="text-base text-ink-soft md:text-lg">
		A collection of projects spanning cross-platform apps, web platforms, and developer tools.
		Built with Go, Rust, TypeScript, and modern frameworks.
	</p>
</header>

<section class="space-y-6">
	<h2 class="text-xl font-bold text-ink md:text-2xl">
		Projects
	</h2>

	{#if props.data.projects.length > 0}
		<ul class="group/list space-y-10">
			{#each props.data.projects as project}
				<li><ProjectRow {project} /></li>
			{/each}
		</ul>

		<p class="mt-10 text-sm text-ink-mute">
			Want to see more? Check out my <InlineLink href="https://github.com/AbdelilahOu">GitHub</InlineLink> for additional projects and experiments.
		</p>
	{:else}
		<div class="space-y-2 text-sm">
			<p class="text-ink-soft">No projects yet. Check back soon for new additions.</p>
			<p class="text-ink-mute">In the meantime, check out my <InlineLink href="https://github.com/AbdelilahOu">GitHub</InlineLink> for code and projects.</p>
		</div>
	{/if}
</section>
