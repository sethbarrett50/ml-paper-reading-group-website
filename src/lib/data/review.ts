import type { Paper } from './papers';
import { PAPERS } from './papers';
import type { Meeting } from './schedule';
import { SCHEDULE } from './schedule';

export type ReviewedPaper = Paper & {
	reviewed: boolean;
	reviewDate?: string; // ISO date
	discussionLeaders?: string;
	term?: string;
	meetingLabel?: string;
};

/**
 * Normalizes titles so schedule entries can match paper titles even when
 * they include extra venue text or minor punctuation differences.
 */
function normTitle(t: string): string {
	return t
		.toLowerCase()
		.trim()
		.replace(/\s+/g, ' ')
		.replace(/[“”"']/g, '')
		.replace(/[.:;,!?()]/g, '')
		.replace(/\badvances in neural information processing systems\b/g, '')
		.replace(/\bneurips\b/g, '')
		.replace(/\bnaacl-hlt\b/g, '')
		.replace(/\bnaacl\b/g, '')
		.trim();
}

function buildReviewMap(schedule: Meeting[]): Map<string, Meeting> {
	const map = new Map<string, Meeting>();

	for (const m of schedule) {
		const title = (m.paperTitle ?? '').trim();
		if (!title) continue;

		if (normTitle(title).includes('logistic meeting')) continue;

		map.set(normTitle(title), m);
	}

	return map;
}

/**
 * Match strategy:
 * - Exact normalized match (schedule title == paper title)
 * - Otherwise: schedule contains paper title OR paper contains schedule title
 */
function findMeetingForPaper(
	paper: Paper,
	schedule: Meeting[],
	reviewMap: Map<string, Meeting>
): Meeting | undefined {
	const pt = normTitle(paper.title);

	if (reviewMap.has(pt)) return reviewMap.get(pt);

	for (const m of schedule) {
		const stRaw = (m.paperTitle ?? '').trim();
		if (!stRaw) continue;

		const st = normTitle(stRaw);

		if (st.includes(pt) || pt.includes(st)) {
			if (st.includes('logistic meeting')) continue;
			return m;
		}
	}

	return undefined;
}

export function getReviewedPapers(): ReviewedPaper[] {
	const reviewMap = buildReviewMap(SCHEDULE);

	const withReviewed: ReviewedPaper[] = PAPERS.map((p) => {
		const meeting = findMeetingForPaper(p, SCHEDULE, reviewMap);

		if (!meeting) {
			return { ...p, reviewed: false };
		}

		return {
			...p,
			reviewed: true,
			reviewDate: meeting.date,
			discussionLeaders: meeting.leaders?.trim() || undefined,
			term: meeting.term,
			meetingLabel: meeting.meetingLabel
		};
	});

	withReviewed.sort((a, b) => {
		const ad = a.reviewDate ? Date.parse(a.reviewDate) : Number.POSITIVE_INFINITY;
		const bd = b.reviewDate ? Date.parse(b.reviewDate) : Number.POSITIVE_INFINITY;

		if (ad !== bd) return ad - bd;
		return a.title.localeCompare(b.title);
	});

	return withReviewed;
}
