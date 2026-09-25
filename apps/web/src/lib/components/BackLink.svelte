<script lang="ts">
	import Arrow from '$lib/components/Arrow.svelte';

	interface Props {
		href: string;
		label: string;
	}

	let { href, label }: Props = $props();
</script>

<nav class="sticky top-0 z-50 bg-page py-6 text-sm md:text-base">
	<a {href} class="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink">
		<Arrow direction="left" class="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
		Back to {label}
	</a>
</nav>
