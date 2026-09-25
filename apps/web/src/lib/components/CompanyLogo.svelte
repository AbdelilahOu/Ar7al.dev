<script lang="ts">
	interface Props {
		company: string;
		logo?: string;
		size?: 'md' | 'lg';
	}

	let { company, logo, size = 'md' }: Props = $props();
</script>

<span
	class="flex shrink-0 items-center justify-center rounded-lg border border-line bg-card {size === 'lg'
		? 'size-12'
		: 'size-9 sm:size-10'}"
>
	{#if logo}
		<img
			src={logo}
			alt=""
			class="object-contain grayscale {size === 'lg' ? 'size-7' : 'size-5 sm:size-6'}"
		/>
	{:else}
		<span class="font-semibold text-ink-soft {size === 'lg' ? 'text-lg' : 'text-sm sm:text-base'}">
			{company.charAt(0)}
		</span>
	{/if}
</span>
