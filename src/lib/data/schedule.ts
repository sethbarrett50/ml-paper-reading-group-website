export type Meeting = {
	term: 'Fall 2025' | 'Spring 2026';
	meetingLabel: string; // "Meeting 1", etc.
	date: string; // ISO YYYY-MM-DD
	paperTitle?: string; // can be blank
	leaders?: string; // can be blank
};

export const SCHEDULE: Meeting[] = [
	// Fall 2025
	{
		term: 'Fall 2025',
		meetingLabel: 'Meeting 1',
		date: '2025-09-22',
		paperTitle: 'Gradient-based learning applied to document recognition.',
		leaders: 'Seth B'
	},
	{
		term: 'Fall 2025',
		meetingLabel: 'Meeting 2',
		date: '2025-10-06',
		paperTitle: 'Attention is all you need. Advances in neural information processing systems',
		leaders: 'MD Mahady Hassan'
	},
	{
		term: 'Fall 2025',
		meetingLabel: 'Meeting 3',
		date: '2025-10-20',
		paperTitle: 'Bert: Pre-training of deep bidirectional transformers for language understanding.',
		leaders: 'Brad Boswell'
	},
	{ term: 'Fall 2025', meetingLabel: 'Meeting 4', date: '2025-11-03', paperTitle: '', leaders: '' },
	{
		term: 'Fall 2025',
		meetingLabel: 'Meeting 5',
		date: '2025-11-17',
		paperTitle: 'On the Power of Context-Enhanced Learning in LLMs',
		leaders: 'Sharmen S'
	},
	// { term: 'Fall 2025', meetingLabel: 'Meeting 6', date: '2025-12-01', paperTitle: '', leaders: '' },

	// Spring 2026
	{
		term: 'Spring 2026',
		meetingLabel: 'Meeting 1',
		date: '2026-01-12',
		paperTitle: 'Logistic Meeting for 2026',
		leaders: 'All'
	},
	{
		term: 'Spring 2026',
		meetingLabel: 'Meeting 2',
		date: '2026-02-02',
		paperTitle: 'Improving Language Understanding by Generative Pre-Training',
		leaders: 'Rita'
	},
	{
		term: 'Spring 2026',
		meetingLabel: 'Meeting 3',
		date: '2026-02-16',
		paperTitle: 'Which Attention Heads Matter for In-Context Learning?',
		leaders: 'Sharmen'
	},
	{
		term: 'Spring 2026',
		meetingLabel: 'Meeting 4',
		date: '2026-03-02',
		paperTitle: '',
		leaders: 'Seth'
	},
	{
		term: 'Spring 2026',
		meetingLabel: 'Meeting 5',
		date: '2026-03-16',
		paperTitle: 'ChartGPT: Leveraging LLMs to Generate Charts From Abstract Natural Language',
		leaders: 'Shichen Gao'
	},
	{
		term: 'Spring 2026',
		meetingLabel: 'Meeting 6',
		date: '2026-03-30',
		paperTitle: '',
		leaders: ''
	},
	{
		term: 'Spring 2026',
		meetingLabel: 'Meeting 7',
		date: '2026-04-13',
		paperTitle: '',
		leaders: 'Salil'
	}
];
