<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import LoadingIndecator from "$lib/components/LoadingIndecator.svelte";
  import "../app.css";

  let { children } = $props();

  function isParentOf(parent: string, child: string): boolean {
    return child.startsWith(`${parent}/`) && !child.slice(parent.length + 1).includes("/");
  }

  function shouldTransition(from?: string, to?: string): boolean {
    if (!from || !to || from === to || to === "/") return false;
    if (from === "/") return true;
    return isParentOf(from, to);
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    if (navigation.type === "popstate") return;
    if (!shouldTransition(navigation.from?.url.pathname, navigation.to?.url.pathname)) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<main class="min-h-svh">
  <LoadingIndecator />
  {@render children()}
</main>
