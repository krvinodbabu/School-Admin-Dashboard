/**
 * Academic Planning & Lesson Management — all dummy data.
 */

// ── Lesson Plans ──────────────────────────────────────────────────────────────
export const lessonPlans = [
  {
    id: 1, teacher: 'Ms. Priya Sharma', subject: 'Mathematics', grade: '9-A',
    section: 'A', week: 1, term: 'Term 1', academicYear: '2025-26',
    topics: 'Linear Equations, Substitution Method',
    objectives: 'Students will solve linear equations in two variables using substitution.',
    methodology: 'Lecture, Whiteboard practice, Group problem-solving',
    homework: 'Exercise 4.1 — Q1 to Q10',
    resources: 'NCERT Textbook Ch4, Khan Academy videos, Graph paper',
    status: 'Approved', submittedDate: '2026-06-02', approvedBy: 'Mr. Ramesh Kumar',
    approvedDate: '2026-06-04', revisions: 0,
  },
  {
    id: 2, teacher: 'Mr. Anil Mehta', subject: 'Physics', grade: '10-B',
    section: 'B', week: 1, term: 'Term 1', academicYear: '2025-26',
    topics: 'Newton\'s Laws of Motion, Free Body Diagrams',
    objectives: 'Apply Newton\'s laws to solve real-world force problems.',
    methodology: 'Demonstration, Lab experiment, Peer discussion',
    homework: 'Draw FBDs for 5 scenarios given in worksheet',
    resources: 'Lab weights, pulleys, NCERT Ch10, simulation software',
    status: 'Under Review', submittedDate: '2026-06-03', approvedBy: null,
    approvedDate: null, revisions: 1,
  },
  {
    id: 3, teacher: 'Ms. Kavita Nair', subject: 'English', grade: '8-C',
    section: 'C', week: 2, term: 'Term 1', academicYear: '2025-26',
    topics: 'The Last Leaf — O. Henry, Short Story Analysis',
    objectives: 'Analyse literary devices: irony, symbolism, characterisation.',
    methodology: 'Read-aloud, Socratic seminar, Written response',
    homework: 'Write a 200-word character analysis of Johnsy',
    resources: 'Supplementary reader, Oxford dictionary, Projector',
    status: 'Submitted', submittedDate: '2026-06-05', approvedBy: null,
    approvedDate: null, revisions: 0,
  },
  {
    id: 4, teacher: 'Mr. Deepak Joshi', subject: 'Chemistry', grade: '11-A',
    section: 'A', week: 2, term: 'Term 1', academicYear: '2025-26',
    topics: 'Periodic Table Trends — Electronegativity, Ionisation Energy',
    objectives: 'Explain periodic trends and predict element properties.',
    methodology: 'Lecture, Data analysis tables, Mnemonics',
    homework: 'Compare trends across Period 3 elements in tabular form',
    resources: 'NCERT Class 11 Ch3, periodic table posters',
    status: 'Needs Revision', submittedDate: '2026-06-01', approvedBy: null,
    approvedDate: null, revisions: 2,
  },
  {
    id: 5, teacher: 'Ms. Sunita Pillai', subject: 'Biology', grade: '12-B',
    section: 'B', week: 3, term: 'Term 1', academicYear: '2025-26',
    topics: 'Reproductive Health, STIs, Contraceptive Methods',
    objectives: 'Describe reproductive health measures; evaluate contraceptive options.',
    methodology: 'Lecture, Case studies, Anonymous Q&A',
    homework: 'Read NCERT 4.3 and prepare 5 key points',
    resources: 'NCERT Class 12 Bio Ch4, WHO guidelines handout',
    status: 'Draft', submittedDate: null, approvedBy: null,
    approvedDate: null, revisions: 0,
  },
  {
    id: 6, teacher: 'Mr. Ravi Gupta', subject: 'History', grade: '7-A',
    section: 'A', week: 3, term: 'Term 1', academicYear: '2025-26',
    topics: 'Medieval India — Delhi Sultanate, Administration',
    objectives: 'Describe administrative structure of the Delhi Sultanate.',
    methodology: 'Storytelling, Map work, Timeline activity',
    homework: 'Create a timeline of Delhi Sultanate rulers',
    resources: 'NCERT Class 7 Ch3, Historical atlas, Art prints',
    status: 'Approved', submittedDate: '2026-06-08', approvedBy: 'Mr. Ramesh Kumar',
    approvedDate: '2026-06-09', revisions: 0,
  },
  {
    id: 7, teacher: 'Ms. Meena Rao', subject: 'Mathematics', grade: '6-B',
    section: 'B', week: 4, term: 'Term 1', academicYear: '2025-26',
    topics: 'Fractions — Addition and Subtraction of Unlike Fractions',
    objectives: 'Add and subtract unlike fractions using LCM method.',
    methodology: 'Concrete manipulatives, Peer practice, Exit slips',
    homework: 'Worksheet 5 — Q1 to Q15',
    resources: 'Fraction tiles, NCERT workbook',
    status: 'Submitted', submittedDate: '2026-06-10', approvedBy: null,
    approvedDate: null, revisions: 0,
  },
  {
    id: 8, teacher: 'Mr. Santosh Kumar', subject: 'Computer Science', grade: '10-A',
    section: 'A', week: 4, term: 'Term 1', academicYear: '2025-26',
    topics: 'Python — Functions, Recursion, Scope',
    objectives: 'Write recursive functions and explain variable scope.',
    methodology: 'Live coding, Pair programming, Debugging exercises',
    homework: 'Code factorial and Fibonacci using recursion',
    resources: 'Lab computers, Python 3 IDE, CBSE textbook Ch6',
    status: 'Under Review', submittedDate: '2026-06-11', approvedBy: null,
    approvedDate: null, revisions: 0,
  },
]

// ── Syllabus Planner ──────────────────────────────────────────────────────────
export const syllabusData = [
  {
    id: 1, subject: 'Mathematics', grade: '9-A', term: 'Term 1',
    academicYear: '2025-26', totalChapters: 8, completedChapters: 5,
    units: [
      { id: 1, name: 'Number Systems', chapters: 1, planned: '2026-06-01', actual: '2026-06-03', status: 'Completed', completion: 100 },
      { id: 2, name: 'Polynomials', chapters: 1, planned: '2026-06-08', actual: '2026-06-10', status: 'Completed', completion: 100 },
      { id: 3, name: 'Coordinate Geometry', chapters: 1, planned: '2026-06-15', actual: '2026-06-16', status: 'Completed', completion: 100 },
      { id: 4, name: 'Linear Equations in Two Variables', chapters: 1, planned: '2026-06-22', actual: '2026-06-24', status: 'Completed', completion: 100 },
      { id: 5, name: 'Introduction to Euclid\'s Geometry', chapters: 1, planned: '2026-06-29', actual: '2026-06-30', status: 'Completed', completion: 100 },
      { id: 6, name: 'Lines and Angles', chapters: 1, planned: '2026-07-06', actual: null, status: 'In Progress', completion: 60 },
      { id: 7, name: 'Triangles', chapters: 1, planned: '2026-07-13', actual: null, status: 'Pending', completion: 0 },
      { id: 8, name: 'Quadrilaterals', chapters: 1, planned: '2026-07-20', actual: null, status: 'Pending', completion: 0 },
    ],
  },
  {
    id: 2, subject: 'Physics', grade: '10-B', term: 'Term 1',
    academicYear: '2025-26', totalChapters: 6, completedChapters: 3,
    units: [
      { id: 1, name: 'Light — Reflection & Refraction', chapters: 1, planned: '2026-06-01', actual: '2026-06-05', status: 'Completed', completion: 100 },
      { id: 2, name: 'Human Eye & Colourful World', chapters: 1, planned: '2026-06-10', actual: '2026-06-12', status: 'Completed', completion: 100 },
      { id: 3, name: 'Electricity', chapters: 1, planned: '2026-06-18', actual: '2026-06-20', status: 'Completed', completion: 100 },
      { id: 4, name: 'Magnetic Effects of Electric Current', chapters: 1, planned: '2026-06-28', actual: null, status: 'In Progress', completion: 45 },
      { id: 5, name: 'Sources of Energy', chapters: 1, planned: '2026-07-08', actual: null, status: 'Delayed', completion: 10 },
      { id: 6, name: 'Our Environment', chapters: 1, planned: '2026-07-18', actual: null, status: 'Pending', completion: 0 },
    ],
  },
]

// ── Assessment Planner ────────────────────────────────────────────────────────
export const assessments = [
  { id: 1, name: 'Unit Test 1 — Number Systems', subject: 'Mathematics', grade: '9-A', date: '2026-06-20', duration: 60, maxMarks: 30, type: 'Unit Test', status: 'Completed', bloomsLevel: 'Understanding', difficulty: { simple: 40, medium: 40, complex: 20 } },
  { id: 2, name: 'Weekly Quiz — Newton\'s Laws', subject: 'Physics', grade: '10-B', date: '2026-06-27', duration: 20, maxMarks: 10, type: 'Weekly Quiz', status: 'Completed', bloomsLevel: 'Application', difficulty: { simple: 30, medium: 50, complex: 20 } },
  { id: 3, name: 'Mid-Term Examination', subject: 'Mathematics', grade: '9-A', date: '2026-07-15', duration: 180, maxMarks: 80, type: 'Mid-Term', status: 'Upcoming', bloomsLevel: 'Analysis', difficulty: { simple: 20, medium: 40, complex: 40 } },
  { id: 4, name: 'Assignment — Short Story Analysis', subject: 'English', grade: '8-C', date: '2026-07-05', duration: null, maxMarks: 20, type: 'Assignment', status: 'In Progress', bloomsLevel: 'Evaluation', difficulty: { simple: 20, medium: 30, complex: 50 } },
  { id: 5, name: 'Practical Assessment — Titration', subject: 'Chemistry', grade: '11-A', date: '2026-07-10', duration: 120, maxMarks: 30, type: 'Practical', status: 'Upcoming', bloomsLevel: 'Application', difficulty: { simple: 10, medium: 60, complex: 30 } },
  { id: 6, name: 'Project — Ecosystem Study', subject: 'Biology', grade: '12-B', date: '2026-07-25', duration: null, maxMarks: 25, type: 'Project', status: 'Upcoming', bloomsLevel: 'Synthesis', difficulty: { simple: 10, medium: 30, complex: 60 } },
  { id: 7, name: 'Term Final Exam', subject: 'Physics', grade: '10-B', date: '2026-08-05', duration: 180, maxMarks: 80, type: 'Final Exam', status: 'Planned', bloomsLevel: 'Evaluation', difficulty: { simple: 20, medium: 40, complex: 40 } },
  { id: 8, name: 'Monthly Test — Periodic Table', subject: 'Chemistry', grade: '11-A', date: '2026-06-30', duration: 90, maxMarks: 40, type: 'Monthly Test', status: 'Completed', bloomsLevel: 'Understanding', difficulty: { simple: 35, medium: 45, complex: 20 } },
]

// ── Question Bank ─────────────────────────────────────────────────────────────
export const questions = [
  {
    id: 1, subject: 'Mathematics', grade: '9', chapter: 'Linear Equations',
    type: 'MCQ', difficulty: 'Medium', marks: 1,
    text: 'The pair of linear equations 2x + 3y = 5 and 4x + 6y = 10 has:',
    options: ['A. No solution', 'B. Unique solution', 'C. Infinitely many solutions', 'D. Two solutions'],
    correctOption: 'C',
    explanation: 'The equations are equivalent (multiply eq1 by 2). Hence infinitely many solutions.',
    tags: ['linear equations', 'pair of equations', 'consistency'],
    usedCount: 14, lastUsed: '2026-06-20',
  },
  {
    id: 2, subject: 'Physics', grade: '10', chapter: 'Newton\'s Laws',
    type: 'MCQ', difficulty: 'Simple', marks: 1,
    text: 'A body at rest remains at rest unless acted upon by an external force. This is:',
    options: ['A. Newton\'s First Law', 'B. Newton\'s Second Law', 'C. Newton\'s Third Law', 'D. Law of Gravitation'],
    correctOption: 'A',
    explanation: 'Newton\'s First Law (Law of Inertia) states this property of matter.',
    tags: ['Newton\'s laws', 'inertia', 'motion'],
    usedCount: 22, lastUsed: '2026-06-27',
  },
  {
    id: 3, subject: 'English', grade: '8', chapter: 'The Last Leaf',
    type: 'Short Answer', difficulty: 'Medium', marks: 3,
    text: 'How does the author use the symbol of the last ivy leaf to convey the theme of hope?',
    options: [], correctOption: null,
    explanation: 'Expected answer: The leaf symbolises Johnsy\'s will to live; Behrman\'s sacrifice makes it a symbol of selfless love and hope.',
    tags: ['symbolism', 'theme', 'O. Henry'],
    usedCount: 8, lastUsed: '2026-07-05',
  },
  {
    id: 4, subject: 'Chemistry', grade: '11', chapter: 'Periodic Table',
    type: 'MCQ', difficulty: 'Complex', marks: 2,
    text: 'Which of the following orders is correct for ionisation energy?',
    options: ['A. O > N > F > Ne', 'B. Ne > F > O > N', 'C. Ne > F > N > O', 'D. F > Ne > O > N'],
    correctOption: 'C',
    explanation: 'N has extra stability due to half-filled 2p subshell; O has lower IE than N despite higher Z.',
    tags: ['ionisation energy', 'periodic trends', 'anomalous'],
    usedCount: 6, lastUsed: '2026-06-30',
  },
  {
    id: 5, subject: 'Biology', grade: '12', chapter: 'Reproductive Health',
    type: 'Long Answer', difficulty: 'Complex', marks: 5,
    text: 'Describe the major contraceptive methods available in India. Evaluate their efficacy and societal acceptance.',
    options: [], correctOption: null,
    explanation: 'Should cover barrier, hormonal, IUDs, surgical methods with advantages and disadvantages.',
    tags: ['contraception', 'reproductive health', 'evaluation'],
    usedCount: 3, lastUsed: '2026-07-08',
  },
  {
    id: 6, subject: 'Mathematics', grade: '9', chapter: 'Polynomials',
    type: 'MCQ', difficulty: 'Simple', marks: 1,
    text: 'The degree of the polynomial 4x³ – 2x² + 5x – 1 is:',
    options: ['A. 1', 'B. 2', 'C. 3', 'D. 4'],
    correctOption: 'C',
    explanation: 'The highest power of the variable x is 3, hence degree = 3.',
    tags: ['polynomials', 'degree', 'basic'],
    usedCount: 18, lastUsed: '2026-06-10',
  },
  {
    id: 7, subject: 'Physics', grade: '10', chapter: 'Electricity',
    type: 'Short Answer', difficulty: 'Medium', marks: 3,
    text: 'State Ohm\'s Law and write the formula. A resistor of 10Ω is connected to a 5V battery. Find the current.',
    options: [], correctOption: null,
    explanation: 'Ohm\'s Law: V = IR. Current I = V/R = 5/10 = 0.5 A.',
    tags: ['Ohm\'s law', 'circuit', 'current'],
    usedCount: 11, lastUsed: '2026-06-18',
  },
  {
    id: 8, subject: 'History', grade: '7', chapter: 'Delhi Sultanate',
    type: 'Assertion and Reason', difficulty: 'Medium', marks: 2,
    text: 'Assertion: The Iqta system helped the Sultans manage distant provinces.\nReason: Iqtadars collected revenue and maintained troops on behalf of the Sultan.',
    options: ['A. Both A and R are true and R is the correct explanation', 'B. Both A and R are true but R is not the correct explanation', 'C. A is true but R is false', 'D. A is false but R is true'],
    correctOption: 'A',
    explanation: 'The Iqta system delegated administrative authority and revenue collection to loyal governors.',
    tags: ['Delhi Sultanate', 'Iqta', 'administration'],
    usedCount: 5, lastUsed: '2026-06-09',
  },
]

// ── Approval Workflow ─────────────────────────────────────────────────────────
export const workflowItems = [
  {
    id: 1, planId: 3, teacher: 'Ms. Kavita Nair', subject: 'English', grade: '8-C', week: 2,
    submittedDate: '2026-06-05', status: 'Pending Review', priority: 'Normal',
    reviewedBy: null, comments: [],
    history: [
      { action: 'Submitted', by: 'Ms. Kavita Nair', date: '2026-06-05', note: 'Lesson plan submitted for review.' },
    ],
  },
  {
    id: 2, planId: 2, teacher: 'Mr. Anil Mehta', subject: 'Physics', grade: '10-B', week: 1,
    submittedDate: '2026-06-03', status: 'Under Review', priority: 'High',
    reviewedBy: 'Mr. Ramesh Kumar',
    comments: [
      { by: 'Mr. Ramesh Kumar', date: '2026-06-06', text: 'Please add more details on the lab safety procedures.' },
    ],
    history: [
      { action: 'Submitted', by: 'Mr. Anil Mehta', date: '2026-06-03', note: 'Initial submission.' },
      { action: 'Review Started', by: 'Mr. Ramesh Kumar', date: '2026-06-06', note: 'Review initiated. Comment added.' },
    ],
  },
  {
    id: 3, planId: 4, teacher: 'Mr. Deepak Joshi', subject: 'Chemistry', grade: '11-A', week: 2,
    submittedDate: '2026-06-01', status: 'Needs Revision', priority: 'High',
    reviewedBy: 'Mr. Ramesh Kumar',
    comments: [
      { by: 'Mr. Ramesh Kumar', date: '2026-06-03', text: 'Learning objectives are too vague. Please align with CBSE learning outcomes.' },
      { by: 'Mr. Ramesh Kumar', date: '2026-06-05', text: 'Resources listed are insufficient. Add at least 2 digital resources.' },
    ],
    history: [
      { action: 'Submitted', by: 'Mr. Deepak Joshi', date: '2026-06-01', note: 'First submission.' },
      { action: 'Revision Requested', by: 'Mr. Ramesh Kumar', date: '2026-06-03', note: 'Sent back for revision — objectives unclear.' },
      { action: 'Re-submitted', by: 'Mr. Deepak Joshi', date: '2026-06-04', note: 'Updated objectives section.' },
      { action: 'Revision Requested Again', by: 'Mr. Ramesh Kumar', date: '2026-06-05', note: 'Resources section still incomplete.' },
    ],
  },
  {
    id: 4, planId: 7, teacher: 'Ms. Meena Rao', subject: 'Mathematics', grade: '6-B', week: 4,
    submittedDate: '2026-06-10', status: 'Pending Review', priority: 'Normal',
    reviewedBy: null, comments: [],
    history: [
      { action: 'Submitted', by: 'Ms. Meena Rao', date: '2026-06-10', note: 'Submitted for this week.' },
    ],
  },
  {
    id: 5, planId: 8, teacher: 'Mr. Santosh Kumar', subject: 'Computer Science', grade: '10-A', week: 4,
    submittedDate: '2026-06-11', status: 'Under Review', priority: 'Normal',
    reviewedBy: 'Ms. Anita Singh',
    comments: [],
    history: [
      { action: 'Submitted', by: 'Mr. Santosh Kumar', date: '2026-06-11', note: 'Ready for review.' },
      { action: 'Review Started', by: 'Ms. Anita Singh', date: '2026-06-12', note: 'Picked up for review.' },
    ],
  },
]

// ── Analytics Data ────────────────────────────────────────────────────────────
export const analyticsData = {
  overallStats: {
    syllabusCompletion: 68,
    lessonsSubmitted: 42,
    pendingApprovals: 5,
    questionBankSize: 248,
    teacherSubmissionRate: 87,
    assessmentCoverage: 74,
  },
  subjectProgress: [
    { subject: 'Mathematics', completion: 75, submitted: 12, pending: 1 },
    { subject: 'Physics', completion: 60, submitted: 8, pending: 2 },
    { subject: 'Chemistry', completion: 55, submitted: 7, pending: 1 },
    { subject: 'Biology', completion: 70, submitted: 9, pending: 0 },
    { subject: 'English', completion: 80, submitted: 10, pending: 1 },
    { subject: 'History', completion: 65, submitted: 8, pending: 0 },
  ],
  weeklySubmissions: [
    { week: 'Wk 1', submitted: 6, approved: 5 },
    { week: 'Wk 2', submitted: 8, approved: 6 },
    { week: 'Wk 3', submitted: 7, approved: 5 },
    { week: 'Wk 4', submitted: 9, approved: 7 },
    { week: 'Wk 5', submitted: 6, approved: 4 },
    { week: 'Wk 6', submitted: 6, approved: 3 },
  ],
  difficultyDistribution: [
    { label: 'Simple', value: 35, color: '#22c55e' },
    { label: 'Medium', value: 45, color: '#f59e0b' },
    { label: 'Complex', value: 20, color: '#ef4444' },
  ],
  teacherRates: [
    { name: 'Ms. Priya Sharma', rate: 100, subject: 'Mathematics' },
    { name: 'Mr. Anil Mehta', rate: 90, subject: 'Physics' },
    { name: 'Ms. Kavita Nair', rate: 95, subject: 'English' },
    { name: 'Mr. Deepak Joshi', rate: 80, subject: 'Chemistry' },
    { name: 'Ms. Sunita Pillai', rate: 70, subject: 'Biology' },
    { name: 'Mr. Ravi Gupta', rate: 85, subject: 'History' },
  ],
}

export const PLAN_STATUSES = ['Draft', 'Submitted', 'Under Review', 'Approved', 'Needs Revision']
export const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science']
export const GRADES = ['6-A', '6-B', '7-A', '7-B', '8-C', '9-A', '10-A', '10-B', '11-A', '12-B']
export const TERMS = ['Term 1', 'Term 2', 'Term 3']
export const ACADEMIC_YEARS = ['2025-26', '2026-27']
export const DIFFICULTY_LEVELS = ['Simple', 'Medium', 'Complex']
export const QUESTION_TYPES = ['MCQ', 'Short Answer', 'Long Answer', 'Case Study', 'Assertion and Reason']
