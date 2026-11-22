<script lang="ts">
  function toggleTheme(): void {
    const root = document.documentElement;
    const systemTheme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const next = (root.dataset.theme ?? systemTheme) === "light" ? "dark" : "light";

    root.classList.add("theme-switching");
    if (next === systemTheme) delete root.dataset.theme;
    else root.dataset.theme = next;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("theme-switching")),
    );

    try {
      if (next === systemTheme) localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {}
  }
</script>

<button
  type="button"
  onclick={toggleTheme}
  class="ml-auto cursor-pointer text-ink-soft transition-colors hover:text-ink"
>
  <span class="sr-only light:hidden">Switch to light theme</span>
  <span class="sr-only hidden light:inline">Switch to dark theme</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="size-[1.125em] light:hidden"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="hidden size-[1.125em] light:block"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
</button>
