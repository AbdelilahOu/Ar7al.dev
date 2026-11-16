<script lang="ts">
	function toggleTheme(): void {
		const root = document.documentElement;
		const systemTheme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		const next = (root.dataset.theme ?? systemTheme) === 'light' ? 'dark' : 'light';

		root.classList.add('theme-switching');
		if (next === systemTheme) delete root.dataset.theme;
		else root.dataset.theme = next;
		requestAnimationFrame(() =>
			requestAnimationFrame(() => root.classList.remove('theme-switching'))
		);

		try {
			if (next === systemTheme) localStorage.removeItem('theme');
			else localStorage.setItem('theme', next);
		} catch {}
	}
</script>

<button
	type="button"
	onclick={toggleTheme}
	class="ml-auto cursor-pointer text-ink-soft transition-colors hover:text-ink"
>
	<span class="sr-only">Switch to</span>
	<span class="light:hidden">Light</span>
	<span class="hidden light:inline">Dark</span>
	<span class="sr-only">theme</span>
</button>
