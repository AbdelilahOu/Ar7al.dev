<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen w-screen bg-page px-4 flex flex-col">
	<div class="m-auto w-full max-w-3xl min-h-screen h-full flex flex-col">
		<Navbar />
		<div class="space-y-8 flex-1 mb-16">
		    {@render children()}
		</div>
		<Footer/>
	</div>
</div>
