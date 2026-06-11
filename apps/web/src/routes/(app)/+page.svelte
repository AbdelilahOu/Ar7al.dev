<script lang="ts">
	import type { ContributionData, Post } from '$lib/types';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import ContactsCard from '$lib/components/ContactsCard.svelte';
	import GithubGraph from '$lib/components/GithubGraph.svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';
	import type { Project } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';


	let props: {
		data: {
			featuredProjects: Project[];
			latestPosts: Post[];
			githubContributions: Promise<ContributionData | null>;
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

	const languages = ['Golang', 'Rust', 'Typescript', 'Javascript', 'Html', 'Css'];
	const frameworks = [
		'Next.js',
		'Tauri',
		'Hono.js',
		'Nuxt.js',
		'Gin',
		'Chi',
		'Actix',
		'Express.js',
		'Tailwindcss'
	];
	const tools = ['Docker', 'Git', 'Github', 'Postman'];
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
	<h1 class="font-display text-3xl font-semibold text-white md:text-4xl">
		Abdelilah Ouaadouch
		<span class="block text-xl font-normal normal-case text-gray-300 md:text-2xl">
			Fullstack Developer
		</span>
	</h1>
 <p class="text-base text-gray-300 md:text-lg">
		2+ years building production APIs, full-stack products, desktop apps, and AI tools from backend
		services to polished UI with Go, Rust, TypeScript, Gin, Next.js, and Tauri.
	</p>
	<p class="text-sm text-gray-400 md:text-base">
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

<section class="space-y-4">
	<h2 class="text-xl font-bold text-white md:text-2xl">
		<span>$</span> Contact
	</h2>
	<ContactsCard />
</section>



<section class="space-y-4">
	<h2 class="text-xl font-bold text-white md:text-2xl">
		<span>$</span> GitHub Activity
	</h2>
	<div class="corner-brackets bg-[#101010] p-5">
		{#await props.data.githubContributions}
			<p class="mb-4 text-white">
				Total Contributions in {props.data.year}:
				<span class="font-semibold text-gray-400">...</span>
			</p>
			<GithubGraph data={null} year={props.data.year} />
		{:then contributions}
			<p class="mb-4 text-white">
				Total Contributions in {props.data.year}:
				<span class="font-semibold text-blue-400">
					{contributions?.totalGH ?? 0}
				</span>
			</p>
			<GithubGraph data={contributions ?? null} year={props.data.year} />
		{:catch}
			<p class="mb-4 text-white">
				Total Contributions in {props.data.year}:
				<span class="font-semibold text-gray-400">0</span>
			</p>
			<GithubGraph data={null} year={props.data.year} />
		{/await}
	</div>
</section>

<section class="space-y-4">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-bold text-white md:text-2xl">
			<span>$</span> Featured Projects
		</h2>
		<a href="/projects" class="text-sm text-gray-400 transition-colors hover:text-white">
			View all {"->"}
		</a>
	</div>
	<div class="space-y-4">
		{#each props.data.featuredProjects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</section>

<section class="space-y-4">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-bold text-white md:text-2xl">
			<span>$</span> Latest Posts
		</h2>
		<a href="/blog" class="text-sm text-gray-400 transition-colors hover:text-white">
			View all {"->"}
		</a>
	</div>
	{#if props.data.latestPosts.length > 0}
		<div class="space-y-4">
			{#each props.data.latestPosts as post}
				<BlogCard {post} />
			{/each}
		</div>
	{:else}
		<div class="corner-brackets bg-[#101010] p-5 text-center">
			<p class="text-gray-400">No blog posts yet. Check back soon!</p>
		</div>
	{/if}
</section>

<section class="space-y-4">
	<h2 class="text-xl font-bold text-white md:text-2xl">
		<span>$</span> Skills
	</h2>
	<SkillsGrid skills={languages} />
	<SkillsGrid skills={frameworks} />
	<SkillsGrid skills={tools} />
</section>
