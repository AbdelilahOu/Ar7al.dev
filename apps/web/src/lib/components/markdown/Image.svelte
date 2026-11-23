<script lang="ts">
  interface Picture {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  }

  interface Props {
    src: string | Picture;
    alt?: string;
    title?: string;
  }

  let { src, alt = "", title }: Props = $props();
</script>

{#if typeof src === "string"}
  <img {src} {alt} {title} loading="lazy" decoding="async" />
{:else}
  <picture>
    {#each Object.entries(src.sources) as [format, srcset] (format)}
      <source {srcset} type="image/{format}" />
    {/each}
    <img
      src={src.img.src}
      width={src.img.w}
      height={src.img.h}
      {alt}
      {title}
      loading="lazy"
      decoding="async"
    />
  </picture>
{/if}
