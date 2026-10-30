<script lang="ts">
    import LoadingIndecator from '$lib/components/LoadingIndecator.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<main class="min-h-svh">
    <LoadingIndecator/>
	{@render children()}
</main>
