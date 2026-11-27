<script lang="ts">
  import type { ProjectTech } from "$lib/data/projects";

  interface Props {
    tech: ProjectTech[];
  }

  let { tech }: Props = $props();
</script>

<dl class="space-y-5">
  {#each tech as item}
    <div class="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <dt class="text-sm text-ink">{item.name}</dt>
      <dd class="text-[15px] leading-6 text-ink-soft">{item.use}</dd>
    </div>
  {/each}
</dl>
