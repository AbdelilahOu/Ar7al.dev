<script lang="ts">
  import CompanyLogo from "$lib/components/CompanyLogo.svelte";
  import ListRow from "$lib/components/ListRow.svelte";
  import { type Experience, formatDateRange } from "$lib/data/experiences";

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
  transitionName="career-{experience.slug}"
>
  {#snippet icon()}
    <CompanyLogo company={experience.company} logo={experience.logo} mono={experience.logoMono} />
  {/snippet}
</ListRow>
