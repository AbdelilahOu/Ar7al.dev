<script lang="ts">
	import ListRow from '$lib/components/ListRow.svelte';
	import type { Project } from '$lib/data/projects';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	let created = $derived(
		new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
	);
</script>

<ListRow
	href="/projects/{project.slug}"
	title={project.title}
	linkTitle="{project.title} - {project.description}"
	description={project.description}
	meta={created}
	tech={project.tech}
/>
