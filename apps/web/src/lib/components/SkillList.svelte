<script lang="ts">
	import { skillIcon } from '$lib/data/skills';

	interface Props {
		skills: string[];
		label?: string;
	}

	let { skills, label }: Props = $props();
</script>

<div class={label ? 'grid gap-y-3 sm:grid-cols-[8rem_1fr] sm:gap-x-6' : ''}>
	{#if label}
		<p class="pt-0.5 text-xs uppercase tracking-widest text-ink-mute">{label}</p>
	{/if}
	<ul class="flex flex-wrap gap-x-6 gap-y-3">
		{#each skills as skill}
			{@const icon = skillIcon(skill)}
			<li class="flex items-center gap-2 text-sm text-ink-soft">
				{#if icon}
					<img src={icon} alt="" class="size-5 object-contain" />
				{:else}
					<span
						class="flex size-5 items-center justify-center rounded-sm border border-line text-[10px] text-ink-mute"
					>
						{skill.charAt(0)}
					</span>
				{/if}
				{skill}
			</li>
		{/each}
	</ul>
</div>
