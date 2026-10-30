<script lang="ts">
    import LoadingIndecator from '$lib/components/LoadingIndecator.svelte';
	import '../app.css';
	import jetbrainsMonoCore from '$lib/assets/fonts/jetbrains-mono-core.woff2?url';
	import instrumentSerifCore from '$lib/assets/fonts/instrument-serif-italic-core.woff2?url';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" href={jetbrainsMonoCore} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={instrumentSerifCore} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<main class="min-h-svh">
    <LoadingIndecator/>
	{@render children()}
</main>
