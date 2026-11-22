<script lang="ts">
  import { page } from "$app/state";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/career", label: "Career" },
    { href: "/blog", label: "Blog" },
  ];
</script>

<nav
  class="nav-fade flex items-center sticky top-0 z-50 gap-6 -mx-4 px-4 py-6 text-sm md:text-base"
>
  {#each links as link}
    <a
      href={link.href}
      class="transition-colors {page.url.pathname === link.href
        ? 'text-ink border-ink'
        : 'text-ink-soft hover:text-ink'}"
    >
      {link.label}
    </a>
  {/each}
  <ThemeToggle />
</nav>
