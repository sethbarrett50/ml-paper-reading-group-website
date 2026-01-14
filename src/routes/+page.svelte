<script lang="ts">
	import { base } from '$app/paths';

	const universityPresenceUrl =
		'https://augusta.presence.io/organization/ai-ml-paper-reading-group';
	const contactUrl = '';
</script>

<section class="card" style="padding: 22px;">
	<div class="pill">Machine Learning • Reading & Discussion • Community</div>

	<div style="display:flex; gap: 18px; margin-top: 16px; align-items:center; flex-wrap:wrap;">
		<img
			src="{base}/logo.png"
			alt="ML Paper Reading Group logo"
			style="width: 74px; height: 74px; border-radius: 18px; border: 1px solid var(--border);
			background: rgba(255,255,255,0.05); object-fit: cover;"
		/>

		<div style="min-width: min(560px, 100%); flex: 1;">
			<h1 style="margin: 0 0 6px; font-size: clamp(2rem, 3vw, 2.7rem); letter-spacing:-0.02em;">
				ML Paper Reading Group
			</h1>

			<p style="margin: 0; color: var(--muted); font-size: 1.05rem; max-width: 75ch;">
				We meet regularly to read and discuss influential ML papers including foundations, modern
				LLMs, theory, and applied work. The goal is practical understanding: what the paper does,
				why it works, and what we can build from it.
			</p>
		</div>
	</div>

	<div style="display:flex; gap: 12px; margin-top: 18px; flex-wrap: wrap;">
		<a class="btn primary" href="{base}/schedule">View schedule</a>
		<a class="btn" href="{base}/papers">Papers we’ve reviewed</a>
		<a class="btn" href={universityPresenceUrl} target="_blank" rel="noreferrer"
			>University presence</a
		>
		{#if contactUrl}
			<a class="btn" href={contactUrl} target="_blank" rel="noreferrer">Join / Contact</a>
		{/if}
	</div>
</section>

<div class="grid cols-3" style="margin-top: 14px;">
	<section class="card" style="padding: 16px;">
		<h3 style="margin: 0 0 8px;">What to expect</h3>
		<p style="margin:0; color:var(--muted);">
			One discussion leader, then group discussion: core idea, key figures, strengths/weaknesses,
			and open questions.
		</p>
	</section>

	<section class="card" style="padding: 16px;">
		<h3 style="margin: 0 0 8px;">Topics</h3>
		<p style="margin:0; color:var(--muted);">
			Transformers/LLMs, theory, safety, and applied ML. We keep a running list of reviewed papers.
		</p>
	</section>

	<section class="card" style="padding: 16px;">
		<h3 style="margin: 0 0 8px;">Get involved</h3>
		<p style="margin:0; color:var(--muted);">
			Suggest papers, volunteer to present, or propose a theme week. New members welcome.
		</p>
	</section>
</div>
