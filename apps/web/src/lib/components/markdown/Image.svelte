<script lang="ts">
  interface Picture {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  }

  interface Props {
    src: string | Picture;
    alt?: string;
    title?: string;
    class?: string;
    eager?: boolean;
    sizes?: string;
  }

  let {
    src,
    alt = "",
    title,
    class: className,
    eager = false,
    sizes = "(min-width: 50rem) 48rem, calc(100vw - 2rem)",
  }: Props = $props();

  function widthSrcset(srcset: string, width: number): string {
    const entries = srcset.split(",").map((entry) => {
      const [url, density = "1x"] = entry.trim().split(/\s+/);
      return { url, density: parseFloat(density) };
    });
    const max = Math.max(...entries.map((entry) => entry.density));
    return entries
      .map((entry) => `${entry.url} ${Math.round((width * entry.density) / max)}w`)
      .join(", ");
  }
</script>

{#if typeof src === "string"}
  <img {src} {alt} {title} class={className} loading="lazy" decoding="async" />
{:else}
  <picture>
    {#each Object.entries(src.sources) as [format, srcset] (format)}
      <source srcset={widthSrcset(srcset, src.img.w)} {sizes} type="image/{format}" />
    {/each}
    <img
      src={src.img.src}
      width={src.img.w}
      height={src.img.h}
      {alt}
      {title}
      class={className}
      loading={eager ? "eager" : "lazy"}
      fetchpriority={eager ? "high" : undefined}
      decoding="async"
    />
  </picture>
{/if}
