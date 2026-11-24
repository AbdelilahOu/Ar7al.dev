<script lang="ts">
  import ListRow from "$lib/components/ListRow.svelte";
  import Image from "$lib/components/markdown/Image.svelte";
  import type { Post } from "$lib/types";

  interface Props {
    post: Post;
    showImage?: boolean;
    eagerImage?: boolean;
  }

  let { post, showImage = false, eagerImage = false }: Props = $props();

  let published = $derived(
    new Date(post.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  );
</script>

{#snippet cover()}
  {#if post.cover}
    <div style:view-transition-name="post-{post.slug}-image">
      <Image
        src={post.cover}
        alt={post.imageAlt ?? post.title}
        sizes="(min-width: 50rem) 42rem, calc(100vw - 2rem)"
        class="h-auto w-full rounded-md border border-line"
        eager={eagerImage}
      />
    </div>
  {/if}
{/snippet}

<ListRow
  href="/blog/{post.slug}"
  title={post.title}
  linkTitle="{post.title} - {post.description}"
  subtitle={post.tags.join(" · ")}
  description={post.description}
  meta={published}
  transitionName="post-{post.slug}"
  media={showImage && post.cover ? cover : undefined}
/>
