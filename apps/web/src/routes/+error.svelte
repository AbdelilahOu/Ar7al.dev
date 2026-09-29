<script lang="ts">
	import { page } from '$app/state';
	import Arrow from '$lib/components/Arrow.svelte';

	let message = $derived(
		page.status === 404
			? 'Page not found'
			: page.status === 500
				? 'Internal server error'
				: (page.error?.message ?? 'Something went wrong')
	);
</script>

<svelte:head>
	<title>{page.status} - Abdelilah Ouaadouch</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-screen w-full items-center justify-center bg-page px-4">
	<main class="w-full max-w-3xl">
		<p class="text-xs uppercase tracking-[0.2em] text-ink-mute">Error</p>
		<h1 class="mt-4 font-display text-8xl leading-none italic text-ink md:text-9xl">
			{page.status}
		</h1>
		<p class="mt-5 text-lg text-ink-soft">{message}</p>
		<nav class="mt-10 border-t border-line pt-6 text-sm">
			<a
				href="/"
				class="group inline-flex items-center gap-2 text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-mute"
			>
				<Arrow
					direction="left"
					class="size-4 transition-transform duration-300 group-hover:-translate-x-1"
				/>
				Back to home
			</a>
		</nav>
	</main>
</div>
