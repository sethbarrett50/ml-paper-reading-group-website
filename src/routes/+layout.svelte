<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="color-scheme" content="dark" />
</svelte:head>

<Nav />

<main class="container" style="padding: 28px 0 60px;">
	{@render children()}
</main>

<footer class="container" style="padding-bottom: 40px; color: var(--muted);">
	<div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
		<span>© {new Date().getFullYear()} ML Paper Reading Group</span>
		<!-- <span style="opacity:0.9;">Built with Svelte 5 + SvelteKit</span> -->
	</div>
</footer>
