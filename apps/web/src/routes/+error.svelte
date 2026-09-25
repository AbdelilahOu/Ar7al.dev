<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} - Abdelilah Ouaadouch</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-screen w-screen flex-col items-center justify-center bg-page px-4">
	<div class="m-auto w-full max-w-lg space-y-6 text-center">
		<div class="rounded-md bg-card p-8">
			<h1 class="font-display text-6xl font-bold text-ink md:text-8xl">
				{page.status}
			</h1>
			<p class="mt-4 text-lg text-ink-soft md:text-xl">
				{#if page.status === 404}
					Page not found
				{:else if page.status === 500}
					Internal server error
				{:else}
					{page.error?.message ?? 'Something went wrong'}
				{/if}
			</p>
		</div>

		<div class="space-y-2 text-ink-soft">
			<p class="font-mono text-sm">
				<span class="text-red-400">$</span> cat ./error.log
			</p>
			<p class="font-mono text-xs text-ink-mute">
				{#if page.status === 404}
					Error: ENOENT - no such file or directory
				{:else}
					Error: {page.error?.message ?? 'Unknown error'}
				{/if}
			</p>
		</div>

		<a
			href="/"
			class="inline-block rounded-md bg-card px-6 py-3 text-ink transition-colors hover:bg-raised"
		>
			<span class="text-blue-400">$</span> cd ~
		</a>
	</div>
</div>
