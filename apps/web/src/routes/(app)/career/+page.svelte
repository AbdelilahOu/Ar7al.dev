<script lang="ts">
	import type { Experience } from '$lib/data/experiences';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';

	let props: { data: { experiences: Experience[]; origin: string } } = $props();

	const title = 'Career - Abdelilah Ouaadouch';
	const description =
		'Professional experience as a Full Stack Engineer. Building backend systems with Go, Rust, TypeScript, and modern frameworks across healthcare, education, and enterprise applications.';
	const url = `${props.data.origin}/career`;
	const image = `${props.data.origin}/career/social.png`;
	const personId = `${props.data.origin}#person`;
	const websiteId = `${props.data.origin}#website`;
	const webpageId = `${url}#webpage`;
	const breadcrumbId = `${url}#breadcrumb`;
	const normalizeDate = (value: string | null) => {
		if (!value) return undefined;
		if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
		if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
		if (/^\d{4}$/.test(value)) return `${value}-01-01`;
		const parsed = new Date(value);
		if (Number.isNaN(parsed.getTime())) return undefined;
		return parsed.toISOString().slice(0, 10);
	};
	const experienceItems = props.data.experiences.map((experience, index) => ({
		"@type": "ListItem",
		"position": index + 1,
		"item": {
			"@type": "Role",
			"roleName": experience.title,
			"description": experience.description,
			"startDate": normalizeDate(experience.startDate),
			...(experience.endDate ? { "endDate": normalizeDate(experience.endDate) } : {}),
			"employmentType": experience.type,
			"worksFor": {
				"@type": "Organization",
				"name": experience.company,
				...(experience.companyUrl ? { "url": experience.companyUrl } : {})
			},
			"location": experience.location
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
				"@id": `${url}#experience-list`,
				"itemListElement": experienceItems
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
					"@id": `${url}#experience-list`
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
						"item": url
					}
				]
			}
		]
	})}</script>`}
</svelte:head>

<header class="space-y-4">
	<h1 class="font-display text-3xl font-semibold text-white md:text-4xl">
		Career
		<span class="block text-xl font-normal normal-case text-gray-300 md:text-2xl">
			Professional Experience
		</span>
	</h1>
	<p class="text-base text-gray-300 md:text-lg">
		My journey as a Full Stack Engineer, building backend systems and applications
		across healthcare, education, and enterprise domains.
	</p>
</header>

<section class="space-y-4">
	<h2 class="text-xl font-bold text-white md:text-2xl">
		<span>$</span> Work Experience
	</h2>

	{#if props.data.experiences.length > 0}
		<div class="space-y-4">
			{#each props.data.experiences as experience}
				<ExperienceCard {experience} />
			{/each}
		</div>

		<div class="corner-brackets bg-[#101010] p-5 text-center">
			<p class="text-gray-400">
				Want to connect? Find me on
				<a
					href="https://www.linkedin.com/in/ar7al"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-400 hover:text-blue-300"
				>
					LinkedIn
				</a>
				or check out my
				<a
					href="https://github.com/AbdelilahOu"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-400 hover:text-blue-300"
				>
					GitHub
				</a>.
			</p>
		</div>
	{:else}
		<div class="corner-brackets bg-[#101010] p-8 text-center">
			<p class="text-gray-400">
				No experience entries yet. Check back soon.
			</p>
		</div>
	{/if}
</section>

<section class="space-y-4">
	<h2 class="text-xl font-bold text-white md:text-2xl">
		<span>$</span> Skills
	</h2>
	<SkillsGrid skills={['Go/Golang', 'Rust', 'TypeScript', 'Node.js', 'React', 'Angular', 'PostgreSQL', 'Docker', 'Kafka', 'REST APIs']} />
</section>
