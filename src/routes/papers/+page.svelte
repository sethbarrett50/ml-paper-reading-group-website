<script lang="ts">
	import { getReviewedPapers, type ReviewedPaper } from '$lib/data/review';

	const papers: ReviewedPaper[] = getReviewedPapers();

	function fmtDate(iso?: string): string {
		if (!iso) return '';
		return new Date(iso).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<h1 style="margin: 0 0 14px;">Papers</h1>

<section class="card" style="padding: 16px;">
	<p style="margin:0; color:var(--muted);">
		Ordered by the date we reviewed them (reviewed first). Unreviewed papers appear at the bottom.
	</p>
</section>

<div style="margin-top: 14px; display:flex; flex-direction:column; gap: 12px;">
	{#each papers as p (p.id)}
		<section class="card" style="padding: 16px;">
			<div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
				<div style="display:flex; flex-direction:column; gap:6px; min-width: min(640px, 100%);">
					<div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
						{#if p.reviewed}
							<span
								class="pill"
								style="border-color: rgba(34,197,94,0.45); background: rgba(34,197,94,0.12); color: rgba(255,255,255,0.9);"
								>Reviewed • {fmtDate(p.reviewDate)}</span
							>
						{:else}
							<span class="pill">Not reviewed yet</span>
						{/if}

						{#if p.proposer}
							<span class="pill">Proposed by {p.proposer}</span>
						{/if}

						{#if p.discussionLeaders}
							<span class="pill">Leader(s): {p.discussionLeaders}</span>
						{/if}
					</div>

					<h2 style="margin: 0; font-size: 1.25rem; letter-spacing:-0.01em;">
						{#if p.link}
							<a href={p.link} target="_blank" rel="noreferrer">{p.title}</a>
						{:else}
							{p.title}
						{/if}
					</h2>

					{#if p.authors}
						<p style="margin:0; color: var(--muted);">{p.authors}</p>
					{/if}

					{#if p.contribution}
						<p style="margin: 8px 0 0; color: rgba(255,255,255,0.82);">
							<span style="color: var(--muted);">Contribution:</span>
							{p.contribution}
						</p>
					{/if}

					{#if p.citation}
						<p style="margin: 8px 0 0; color: var(--muted);">
							<span style="color: rgba(255,255,255,0.78);">Citation:</span>
							{p.citation}
						</p>
					{/if}
				</div>

				<div style="display:flex; gap:10px; align-items:flex-start; flex-wrap:wrap;">
					{#if p.link}
						<a class="btn" href={p.link} target="_blank" rel="noreferrer">Open</a>
					{/if}
				</div>
			</div>
		</section>
	{/each}
</div>
