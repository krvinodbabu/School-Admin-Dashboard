/**
 * Dummy library book records.
 */
export const libraryBooks = [
  { id: 1, title: 'Introduction to Physics', author: 'H.C. Verma', isbn: '978-8177091878', category: 'Science', copies: 12, available: 8 },
  { id: 2, title: 'Mathematics for Class 10', author: 'R.D. Sharma', isbn: '978-8197596545', category: 'Mathematics', copies: 20, available: 5 },
  { id: 3, title: 'The Story of My Life', author: 'Helen Keller', isbn: '978-8175993562', category: 'Biography', copies: 8, available: 6 },
  { id: 4, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', isbn: '978-8173711464', category: 'Biography', copies: 15, available: 3 },
  { id: 5, title: 'NCERT Science Class 9', author: 'NCERT', isbn: '978-8174504935', category: 'Science', copies: 25, available: 10 },
  { id: 6, title: 'English Grammar in Use', author: 'Raymond Murphy', isbn: '978-0521537629', category: 'English', copies: 10, available: 7 },
]

export const borrowedBooks = [
  { id: 1, student: 'Aarav Sharma', book: 'Introduction to Physics', issueDate: '2026-06-20', dueDate: '2026-07-20', status: 'Issued' },
  { id: 2, student: 'Priya Patel', book: 'Mathematics for Class 10', issueDate: '2026-06-25', dueDate: '2026-07-25', status: 'Issued' },
  { id: 3, student: 'Rohan Mehta', book: 'Wings of Fire', issueDate: '2026-05-15', dueDate: '2026-06-15', status: 'Overdue' },
]
