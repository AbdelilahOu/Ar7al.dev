<script lang="ts">
	import OgFrame from './OgFrame.svelte';
	import OgLogo from './OgLogo.svelte';
	import { colors } from './og';

	interface Props {
		roles: { company: string; title: string; dates: string; logo?: string }[];
	}

	let { roles }: Props = $props();
</script>

<OgFrame label="Career" path="ar7al.com/career">
	<div style="display: flex; font-size: 44px; line-height: 1.1; color: {colors.ink};">
		Professional experience
	</div>

	<div style="display: flex; flex-direction: column; gap: 14px; margin-top: 26px;">
		{#each roles as role}
			<div style="display: flex; align-items: center; gap: 18px;">
				<OgLogo company={role.company} logo={role.logo} size={40} />
				<div style="display: flex; flex-direction: column; flex: 1;">
					<span style="display: flex; font-size: 24px; color: {colors.ink};">{role.company}</span>
					<span style="display: flex; margin-top: 2px; font-size: 16px; color: {colors.inkSoft};">
						{role.title}
					</span>
				</div>
				<span style="display: flex; font-size: 18px; color: {colors.inkMute};">{role.dates}</span>
			</div>
		{/each}
	</div>
</OgFrame>
