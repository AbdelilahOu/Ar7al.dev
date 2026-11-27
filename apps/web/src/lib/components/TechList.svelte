<script lang="ts">
  interface Props {
    tech: string[];
  }

  let { tech }: Props = $props();
</script>

<ul class="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="Tech stack">
  {#each tech as name}
    <li class="text-xs text-ink-mute">
      <span class="font-display text-sm italic" aria-hidden="true">#</span>{name}
    </li>
  {/each}
</ul>
