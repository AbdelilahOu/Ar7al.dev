<script lang="ts">
  import Image from "$lib/components/markdown/Image.svelte";
  import type { Picture } from "@sveltejs/enhanced-img";

  interface Props {
    src: Picture;
    light?: Picture | null;
    alt: string;
    class?: string;
    sizes?: string;
    eager?: boolean;
  }

  let { src, light, alt, class: className = "", sizes, eager = false }: Props = $props();
</script>

{#if light}
  <Image {src} {alt} {sizes} {eager} class="{className} light:hidden" />
  <Image src={light} {alt} {sizes} {eager} class="{className} hidden light:block" />
{:else}
  <Image {src} {alt} {sizes} {eager} class={className} />
{/if}
