<script lang="ts">
	import leadership from '$lib/data/leadership.json';

	type Link = { label: string; url: string };
	type Member = {
		name: string;
		role: string;
		affiliation?: string;
		email?: string;
		links?: Link[];
	};

	const members = leadership as Member[];

	const roleOrder: Record<string, number> = {
		President: 1,
		'Vice President': 2,
		Secretary: 3,
		Treasurer: 4,
		'Public Relations': 5,
		'Co-Advisor': 10
	};

	members.sort((a, b) => {
		const ao = roleOrder[a.role] ?? 99;
		const bo = roleOrder[b.role] ?? 99;
		if (ao !== bo) return ao - bo;
		return a.name.localeCompare(b.name);
	});
</script>

<h1 style="margin: 0 0 14px;">Leadership</h1>

<section class="card" style="padding: 16px; margin-bottom: 14px;">
	<p style="margin:0; color:var(--muted); max-width: 90ch;">
		The ML Paper Reading Group leadership team coordinates meeting logistics, schedules presenters,
		and maintains the paper list. Reach out if you’d like to present or suggest a paper.
	</p>
</section>

<div class="grid cols-3">
	{#each members as m (m.email ?? m.name)}
		<section class="card" style="padding: 16px;">
			<div class="pill">{m.role}</div>

			<h2 style="margin: 10px 0 4px; font-size: 1.15rem; letter-spacing: -0.01em;">
				{m.name}
			</h2>

			{#if m.affiliation}
				<p style="margin: 0 0 10px; color: var(--muted);">{m.affiliation}</p>
			{/if}

			<div style="display:flex; gap:10px; flex-wrap:wrap;">
				{#if m.email}
					<a class="btn" href={`mailto:${m.email}`}>Email</a>
				{/if}

				{#if m.links}
					{#each m.links as l (l.url)}
						<a class="btn" href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
					{/each}
				{/if}
			</div>
		</section>
	{/each}
</div>
