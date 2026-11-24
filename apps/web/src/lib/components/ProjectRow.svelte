<script lang="ts">
  import ListRow from "$lib/components/ListRow.svelte";
  import Image from "$lib/components/markdown/Image.svelte";
  import type { Project } from "$lib/data/projects";

  interface Props {
    project: Project;
    showImage?: boolean;
    eagerImage?: boolean;
  }

  let { project, showImage = false, eagerImage = false }: Props = $props();

  let created = $derived(
    new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
  );
</script>

{#snippet cover()}
  {#if project.cover}
    <div style:view-transition-name="project-{project.slug}-image">
      <Image
        src={project.cover}
        alt={project.imageAlt ?? `Screenshot of ${project.title}`}
        sizes="(min-width: 50rem) 42rem, calc(100vw - 2rem)"
        class="h-auto w-full rounded-md border border-line"
        eager={eagerImage}
      />
    </div>
  {/if}
{/snippet}

<ListRow
  href="/projects/{project.slug}"
  title={project.title}
  linkTitle="{project.title} - {project.description}"
  description={project.description}
  meta={created}
  tech={project.tech}
  transitionName="project-{project.slug}"
  media={showImage && project.cover ? cover : undefined}
/>
