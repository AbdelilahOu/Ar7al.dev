<script lang="ts">
  import { navigating, page } from '$app/state';
  import { onDestroy } from 'svelte';

  let progress = $state(0);
  let rafId: number | null = null;
  let finishing = $state(false);

  function tick() {
    if (!finishing) {
      progress = Math.min(90, progress + Math.max(0.4, (90 - progress) * 0.035));
    } else {
      progress = Math.min(100, progress + Math.max(1.2, (100 - progress) * 0.25));
    }

    if (finishing && progress >= 99.5) {
      progress = 100;
      setTimeout(() => {
        progress = 0;
        finishing = false;
      }, 180);
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (rafId !== null) return;
    progress = Math.max(progress, 4);
    rafId = requestAnimationFrame(tick);
  }

  function finish() {
    if (progress === 0) return;
    finishing = true;
    if (rafId === null) start();
  }

  $effect(() => {
    if (navigating?.from !== null && navigating?.from.url.href !== navigating?.to?.url.href && navigating?.to?.url.origin === page.url.origin) {
      finishing = false;
      start();
    } else {
      finish();
    }
  });

  onDestroy(() => {
    if (rafId !== null) cancelAnimationFrame(rafId);
  });
</script>

<div class="pointer-events-none fixed left-0 top-0 z-100 h-0.5 w-full">
  <div class="mx-auto h-full max-w-3xl overflow-hidden">
    <div
      class="h-full origin-left bg-ink/90 transition-[width] duration-100 ease-out"
      class:transition-none={progress === 0}
      class:duration-0={progress === 0}
      style="width: {progress}%"
    ></div>
  </div>
</div>
