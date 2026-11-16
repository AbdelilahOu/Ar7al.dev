<script module lang="ts">
	export interface NumberedItem {
		name: string;
		summary: string;
		link?: string;
		tech?: string[];
	}
</script>

<script lang="ts">
	import Arrow from '$lib/components/Arrow.svelte';

	interface Props {
		items: NumberedItem[];
	}

	let { items }: Props = $props();
</script>

<ol class="space-y-10">
	{#each items as item, index}
		<li class="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[3rem_1fr]">
			<span aria-hidden="true" class="pt-1 text-sm text-ink-mute tabular-nums">
				{String(index + 1).padStart(2, '0')}
			</span>
			<div class="min-w-0">
				<h3 class="text-lg leading-snug text-ink sm:text-xl">
					{#if item.link}
						<a
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 transition-colors hover:decoration-ink-mute"
						>
							{item.name}
							<Arrow
								direction="up-right"
								class="size-4 text-ink-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							/>
						</a>
					{:else}
						{item.name}
					{/if}
				</h3>
				<p class="mt-2 max-w-xl text-[15px] leading-7 text-ink-soft">{item.summary}</p>
				{#if item.tech?.length}
					<p class="mt-3 text-xs text-ink-mute">{item.tech.join(' · ')}</p>
				{/if}
			</div>
		</li>
	{/each}
</ol>
