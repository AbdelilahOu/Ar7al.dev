<script lang="ts">
	import ListRow from '$lib/components/ListRow.svelte';
	import { formatDateRange, type Experience } from '$lib/data/experiences';

	interface Props {
		experience: Experience;
	}

	let { experience }: Props = $props();
</script>

<ListRow
	href="/career/{experience.slug}"
	title={experience.company}
	linkTitle="{experience.title} at {experience.company}"
	subtitle={experience.title}
	description={experience.description}
	meta={formatDateRange(experience.startDate, experience.endDate)}
	tech={experience.technologies}
>
	{#snippet icon()}
		<span
			class="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-card sm:size-10"
		>
			{#if experience.logo}
				<img src={experience.logo} alt="" class="size-5 object-contain grayscale sm:size-6" />
			{:else}
				<span class="text-sm font-semibold text-ink-soft sm:text-base">
					{experience.company.charAt(0)}
				</span>
			{/if}
		</span>
	{/snippet}
</ListRow>
