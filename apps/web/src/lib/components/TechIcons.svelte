<script lang="ts">
	import { skillIcon } from '$lib/data/skills';

	interface Props {
		tech: string[];
	}

	let { tech }: Props = $props();
</script>

<ul class="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="Tech stack">
	{#each tech as name}
		{@const icon = skillIcon(name)}
		<li title={name}>
			{#if icon}
				<img src={icon} alt={name} class="size-5 object-contain" />
			{:else}
				<span class="text-xs text-ink-mute">{name}</span>
			{/if}
		</li>
	{/each}
</ul>
