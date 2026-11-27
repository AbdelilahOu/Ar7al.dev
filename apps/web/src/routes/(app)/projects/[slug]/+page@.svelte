<script lang="ts">
  import ActionLink from "$lib/components/ActionLink.svelte";
  import BackLink from "$lib/components/BackLink.svelte";
  import Image from "$lib/components/markdown/Image.svelte";
  import PrevNext from "$lib/components/PrevNext.svelte";
  import SignOff from "$lib/components/SignOff.svelte";
  import TechUsageList from "$lib/components/TechUsageList.svelte";
  import { type Project, type ProjectMetadata, techNames } from "$lib/data/projects";
  import { SITE_ORIGIN } from "$lib/site";
  import type { Picture } from "@sveltejs/enhanced-img";
  import type { Component } from "svelte";

  let props: {
    data: {
      content: Component;
      meta: ProjectMetadata;
      cover: Picture | null;
      slug: string;
      previous: Project | null;
      next: Project | null;
    };
  } = $props();

  let meta = $derived(props.data.meta);
  let url = $derived(`${SITE_ORIGIN}/projects/${props.data.slug}`);
  let image = $derived(`${SITE_ORIGIN}/projects/${props.data.slug}/social.png`);
  let coverImage = $derived(
    props.data.cover && {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}${props.data.cover.img.src}`,
      width: props.data.cover.img.w,
      height: props.data.cover.img.h,
      caption: meta.imageAlt ?? `Screenshot of ${meta.title}`,
    },
  );
  let title = $derived(`${meta.title} - Abdelilah Ouaadouch`);
  let description = $derived(meta.description);
  let personId = $derived(`${SITE_ORIGIN}#person`);
  let websiteId = $derived(`${SITE_ORIGIN}#website`);
  let webpageId = $derived(`${url}#webpage`);
  let breadcrumbId = $derived(`${url}#breadcrumb`);
  let projectId = $derived(`${url}#software`);
  let created = $derived(
    new Date(meta.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />

  <meta property="og:type" content="article" />
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

  {@html `<${"script"} type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Abdelilah Ouaadouch",
        alternateName: "Ar7al",
        jobTitle: "Senior Backend Engineer",
        url: `${SITE_ORIGIN}`,
        image: `${SITE_ORIGIN}/social.png`,
        sameAs: [
          "https://www.linkedin.com/in/ar7al/",
          "https://github.com/AbdelilahOu",
          "https://x.com/Abdelilah4dev",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Abdelilah Ouaadouch - Senior Backend Engineer Portfolio",
        url: `${SITE_ORIGIN}`,
        publisher: {
          "@id": personId,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": projectId,
        name: meta.title,
        description: meta.description,
        ...(coverImage && { image: coverImage, screenshot: coverImage }),
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        url: url,
        author: {
          "@id": personId,
        },
        creator: {
          "@id": personId,
        },
        dateCreated: meta.createdAt,
        softwareRequirements: techNames(meta.tech),
        ...(meta.github ? { codeRepository: meta.github } : {}),
        ...(meta.web ? { sameAs: [meta.web] } : {}),
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        name: title,
        description: description,
        url: url,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mainEntity: {
          "@id": projectId,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
        primaryImageOfPage: coverImage ?? {
          "@type": "ImageObject",
          url: image,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_ORIGIN}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${SITE_ORIGIN}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: meta.title,
            item: url,
          },
        ],
      },
    ],
  })}</script>`}
</svelte:head>

<div class="min-h-screen w-full bg-page px-4 pb-8">
  <div class="m-auto w-full max-w-3xl">
    <BackLink href="/projects" label="Projects" />

    <div class="space-y-12">
      <header class="space-y-4">
        <h1
          class="w-fit font-display text-4xl leading-tight italic text-ink md:text-5xl"
          style:view-transition-name="project-{props.data.slug}"
        >
          {meta.title}
        </h1>
        {#if props.data.cover}
          <div style:view-transition-name="project-{props.data.slug}-image">
            <Image
              src={props.data.cover}
              alt={meta.imageAlt ?? `Screenshot of ${meta.title}`}
              class="h-auto w-full rounded-md border border-line"
              eager
            />
          </div>
        {/if}
        <p class="text-sm text-ink-mute">
          <time datetime={meta.createdAt}>{created}</time>
        </p>
        {#if meta.github || meta.web}
          <div class="flex items-center gap-5 pt-2">
            {#if meta.github}
              <ActionLink href={meta.github}>GitHub</ActionLink>
            {/if}
            {#if meta.web}
              <ActionLink href={meta.web}>Live demo</ActionLink>
            {/if}
          </div>
        {/if}
      </header>

      <article class="project-body">
        <props.data.content />
      </article>

      {#if meta.tech?.length}
        <section class="space-y-8">
          <h2 class="font-display text-3xl italic text-ink md:text-4xl">Built with</h2>
          <TechUsageList tech={meta.tech} />
        </section>
      {/if}

      <footer class="space-y-10 border-t border-line pt-10">
        <PrevNext
          label="More projects"
          previous={props.data.previous && {
            href: `/projects/${props.data.previous.slug}`,
            title: props.data.previous.title,
          }}
          next={props.data.next && {
            href: `/projects/${props.data.next.slug}`,
            title: props.data.next.title,
          }}
        />
        <SignOff message="Thanks for checking this out." />
      </footer>
    </div>
  </div>
</div>
