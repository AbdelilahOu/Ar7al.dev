<script lang="ts">
	import type { ContributionData, Post } from '$lib/types';
	import ContactLinks from '$lib/components/ContactLinks.svelte';
	import ExperienceRow from '$lib/components/ExperienceRow.svelte';
	import PostRow from '$lib/components/PostRow.svelte';
	import GithubGraph from '$lib/components/GithubGraph.svelte';
	import SkillList from '$lib/components/SkillList.svelte';
	import type { Experience } from '$lib/data/experiences';
	import type { Project } from '$lib/data/projects';
	import ProjectRow from '$lib/components/ProjectRow.svelte';


	let props: {
		data: {
			experiences: Experience[];
			featuredProjects: Project[];
			latestPosts: Post[];
			githubContributions: ContributionData | null;
			year: number;
			origin: string;
		};
	} = $props();

	const title = 'Abdelilah Ouaadouch - Fullstack Developer';
	const description =
		'Fullstack engineer specializing in Go, Rust, and TypeScript. I build dependable backends, desktop apps, and AI tools.';
	const url = `${props.data.origin}/`;
	const image = `${props.data.origin}/social.png`;
	const personId = `${props.data.origin}#person`;
	const websiteId = `${props.data.origin}#website`;
	const webpageId = `${url}#webpage`;

	const languages = ['Go', 'Rust', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];
	const frameworks = [
		'Next.js',
		'Tauri',
		'Hono.js',
		'Nuxt.js',
		'Gin',
		'Chi',
		'Actix',
		'Express.js',
		'Tailwind CSS'
	];
	const tools = ['Docker', 'Git', 'GitHub', 'Postman'];
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
				"description": description,
				"email": "mailto:abdelilah4dev@gmail.com",
				"url": url,
				"image": image,
				"sameAs": [
					"https://www.linkedin.com/in/ar7al/",
					"https://github.com/AbdelilahOu",
					"https://x.com/Abdelilah4dev"
				],
				"knowsAbout": [
					"Go",
					"Golang",
					"Typescript",
					"Rust",
					"Fullstack Development",
					"API Development",
					"Next.js",
					"Hono.js",
					"Gin",
					"Docker",
					"Tauri",
					"PostgreSQL",
					"MySQL"
				]
			},
			{
				"@type": "WebSite",
				"@id": websiteId,
				"name": "Abdelilah Ouaadouch - Fullstack Developer Portfolio",
				"url": url,
				"description": "Portfolio of Abdelilah Ouaadouch, a Fullstack Developer specializing in Go, Rust, and TypeScript.",
				"publisher": {
					"@id": personId
				}
			},
			{
				"@type": "ProfilePage",
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
					"@id": personId
				},
				"primaryImageOfPage": {
					"@type": "ImageObject",
					"url": image
				}
			}
		]
	})}</script>`}
</svelte:head>

<section class="space-y-4">
	<h1 class="font-display text-3xl font-semibold text-ink md:text-4xl">
		Abdelilah Ouaadouch
		<span class="block text-xl font-normal normal-case text-ink-soft md:text-2xl">
			Fullstack Developer
		</span>
	</h1>
 <p class="text-base text-ink-soft md:text-lg">
		2+ years building production APIs, full-stack products, desktop apps, and AI tools from backend
		services to polished UI with Go, Rust, TypeScript, Gin, Next.js, and Tauri.
	</p>
	<p class="text-sm text-ink-soft md:text-base">
		Currently working at
		<a
			href="https://dev-up.io/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-400 transition-colors hover:text-blue-300"
		>
			DEV-UP
		</a>.
	</p>
</section>

<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4">
	<section class="space-y-4">
		<h2 class="text-xl font-bold text-ink md:text-2xl">
			Contact
		</h2>
		<ContactLinks />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl font-bold text-ink md:text-2xl">
			GitHub Activity
		</h2>
		<div class="h-28 md:h-auto md:flex-1">
			<GithubGraph data={props.data.githubContributions} year={props.data.year} />
		</div>
	</section>
</div>

<section class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-bold text-ink md:text-2xl">
			Experience
		</h2>
		<a href="/career" class="text-sm text-ink-soft transition-colors hover:text-ink">
			View all {"->"}
		</a>
	</div>
	<ul class="group/list space-y-10">
		{#each props.data.experiences as experience}
			<li><ExperienceRow {experience} /></li>
		{/each}
	</ul>
</section>

<section class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-bold text-ink md:text-2xl">
			Featured Projects
		</h2>
		<a href="/projects" class="text-sm text-ink-soft transition-colors hover:text-ink">
			View all {"->"}
		</a>
	</div>
	<ul class="group/list space-y-10">
		{#each props.data.featuredProjects as project}
			<li><ProjectRow {project} /></li>
		{/each}
	</ul>
</section>

<section class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-bold text-ink md:text-2xl">
			Latest Posts
		</h2>
		<a href="/blog" class="text-sm text-ink-soft transition-colors hover:text-ink">
			View all {"->"}
		</a>
	</div>
	{#if props.data.latestPosts.length > 0}
		<ul class="group/list space-y-10">
			{#each props.data.latestPosts as post}
				<li><PostRow {post} /></li>
			{/each}
		</ul>
	{:else}
		<div class="rounded-md bg-card p-5 text-center">
			<p class="text-ink-soft">No blog posts yet. Check back soon!</p>
		</div>
	{/if}
</section>

<section class="space-y-6">
	<h2 class="text-xl font-bold text-ink md:text-2xl">
		Skills
	</h2>
	<SkillList label="Languages" skills={languages} />
	<SkillList label="Frameworks" skills={frameworks} />
	<SkillList label="Tools" skills={tools} />
</section>
