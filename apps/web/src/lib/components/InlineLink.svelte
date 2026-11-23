<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    children: Snippet;
  }

  let { href, children }: Props = $props();

  let external = $derived(!href.startsWith("/"));
</script>

<a
  {href}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  class="text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-mute"
  >{@render children()}</a
>
