<svelte:head>
	<title>404 - Abdelilah Ouaadouch</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-screen w-screen flex-col items-center justify-center bg-page px-4">
	<div class="m-auto w-full max-w-lg space-y-6 text-center">
		<div class="rounded-md bg-card p-8">
			<h1 class="font-display text-6xl font-bold text-ink md:text-8xl">
				404
			</h1>
			<p class="mt-4 text-lg text-ink-soft md:text-xl">
				Page not found
			</p>
		</div>

		<div class="space-y-2 text-ink-soft">
			<p class="font-mono text-sm">
				<span class="text-red-400">$</span> cat ./error.log
			</p>
			<p class="font-mono text-xs text-ink-mute">
				Error: ENOENT - no such file or directory
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
