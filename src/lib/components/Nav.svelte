<script lang="ts">
	import { base } from '$app/paths';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/schedule', label: 'Schedule' },
		{ href: '/papers', label: 'Papers' },
		{ href: '/leadership', label: 'Leadership' }
		// { href: '/about', label: 'About' }
	];
</script>

<header style="position: sticky; top: 0; z-index: 50; backdrop-filter: blur(10px);">
	<div class="container" style="padding: 14px 0;">
		<div
			class="card"
			style="display:flex; align-items:center; justify-content:space-between; padding: 12px 14px; box-shadow:none;"
		>
			<a href="{base}/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
				<div
					style="width:38px; height:38px; border-radius:12px; border:1px solid var(--border);
					background: rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:center; overflow:hidden;"
				>
					<img
						src="{base}/logo.png"
						alt="ML Paper Reading Group logo"
						style="width: 100%; height: 100%; object-fit: cover;"
					/>
				</div>

				<div style="display:flex; flex-direction:column; line-height:1.1;">
					<span style="font-weight:700;">ML Paper Reading Group</span>
					<span style="color:var(--muted); font-size:0.9rem;">Augusta University</span>
				</div>
			</a>

			<nav style="display:flex; gap: 12px; flex-wrap: wrap; justify-content:flex-end;">
				{#each links as l (l.href)}
					<a class="pill" href="{base}{l.href}">{l.label}</a>
				{/each}
			</nav>
		</div>
	</div>
</header>
