<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';

	let props: { data: { projects: Project[]; origin: string } } = $props();

	const title = 'Projects - Abdelilah Ouaadouch';
	const description =
		'Portfolio of software projects including desktop apps, web applications, and developer tools. Built with Go, Rust, TypeScript, and modern frameworks.';
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
	<h1 class="font-display text-3xl font-semibold text-white md:text-4xl">
		Projects
		<span class="block text-xl font-normal normal-case text-gray-300 md:text-2xl">
			Software I've Built
		</span>
	</h1>
	<p class="text-base text-gray-300 md:text-lg">
		A collection of projects spanning desktop applications, web platforms, and developer tools.
		Built with Go, Rust, TypeScript, and modern frameworks.
	</p>
</header>

<section class="space-y-4">
	<h2 class="text-xl font-bold text-white md:text-2xl">
		<span>$</span> Projects
	</h2>

	{#if props.data.projects.length > 0}
		<div class="space-y-4">
			{#each props.data.projects as project}
				<ProjectCard {project} />
			{/each}
		</div>

		<div class="corner-brackets bg-[#101010] p-5 text-center">
			<p class="text-gray-400">
				Want to see more? Check out my
				<a
					href="https://github.com/AbdelilahOu"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-400 hover:text-blue-300"
				>
					GitHub
				</a>
				for additional projects and experiments.
			</p>
		</div>
	{:else}
		<div class="corner-brackets bg-[#101010] p-8 text-center">
			<p class="text-gray-400">
				No projects yet. Check back soon for new additions.
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
		<span>$</span> Tech Stack
	</h2>
	<SkillsGrid skills={['Go/Golang', 'Rust', 'TypeScript', 'Next.js', 'Nuxt', 'Tauri', 'PostgreSQL', 'SQLite']} />
</section>
