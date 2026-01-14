<script lang="ts">
	import { SCHEDULE, type Meeting } from '$lib/data/schedule';

	const now = new Date();

	function parseISODateLocal(iso: string): Date {
		const [y, m, d] = iso.split('-').map(Number);
		return new Date(y, m - 1, d);
	}

	function fmtDate(iso: string): string {
		return parseISODateLocal(iso).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function isPast(iso: string): boolean {
		const d = parseISODateLocal(iso);
		d.setHours(23, 59, 59, 999);
		return d.getTime() < now.getTime();
	}

	const byTerm = SCHEDULE.reduce<Record<string, Meeting[]>>((acc, m) => {
		acc[m.term] ??= [];
		acc[m.term].push(m);
		return acc;
	}, {});
</script>

<h1 style="margin: 0 0 14px;">Schedule</h1>

<section class="card" style="padding: 16px;">
	<p style="margin:0; color:var(--muted);">
		This is the meeting schedule. If a paper title is blank, it’s still to be determined.
	</p>
</section>

{#each Object.entries(byTerm) as [term, meetings] (term)}
	<h2 style="margin: 18px 0 10px;">{term}</h2>

	<div style="display:flex; flex-direction:column; gap: 10px;">
		{#each meetings as m (`${m.term}-${m.meetingLabel}-${m.date}`)}
			<section class="card" style="padding: 14px;">
				<div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
					<div style="display:flex; flex-direction:column; gap:6px; min-width:min(680px, 100%);">
						<div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
							<span class="pill">{m.meetingLabel}</span>
							<span class="pill">{fmtDate(m.date)}</span>

							{#if m.time?.trim()}
								<span class="pill">{m.time}</span>
							{/if}

							{#if m.location?.trim()}
								<span class="pill">{m.location}</span>
							{/if}

							{#if isPast(m.date)}
								<span
									class="pill"
									style="border-color: rgba(34,197,94,0.45); background: rgba(34,197,94,0.12);"
								>
									Completed
								</span>
							{:else}
								<span class="pill">Upcoming</span>
							{/if}

							{#if m.leaders?.trim()}
								<span class="pill">Leader(s): {m.leaders}</span>
							{/if}
						</div>

						<h3 style="margin: 0; font-size: 1.1rem;">
							{#if m.paperTitle?.trim()}
								{m.paperTitle}
							{:else}
								<span style="color: var(--muted);">Paper TBD</span>
							{/if}
						</h3>
					</div>
				</div>
			</section>
		{/each}
	</div>
{/each}
