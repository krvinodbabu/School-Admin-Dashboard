import { Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DataTable from '../components/DataTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { getLibraryData } from '../services/dataService.js'
import { formatDate } from '../utils/helpers.js'

const bookColumns = [
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'isbn', label: 'ISBN' },
  { key: 'category', label: 'Category' },
  { key: 'copies', label: 'Total Copies' },
  { key: 'available', label: 'Available' },
]

const borrowedColumns = [
  { key: 'student', label: 'Student' },
  { key: 'book', label: 'Book' },
  { key: 'issueDate', label: 'Issue Date' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status' },
]

export default function Library() {
  const { books, borrowed } = getLibraryData()

  return (
    <div className="page">
      <PageHeader title="Library Management" subtitle={`${books.length} books in catalog`}>
        <button type="button" className="btn btn--primary">
          <Plus size={18} /> Add Book
        </button>
      </PageHeader>

      <div className="card">
        <h3 className="card__title">Book Catalog</h3>
        <DataTable
          columns={bookColumns}
          data={books}
          renderRow={(book) => (
            <tr key={book.id}>
              <td><strong>{book.title}</strong></td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td><span className="badge badge--section">{book.category}</span></td>
              <td>{book.copies}</td>
              <td>{book.available}</td>
            </tr>
          )}
          renderMobileCard={(book) => (
            <div className="book-mobile-card">
              <div className="book-mobile-card__header">
                <span className="book-mobile-card__title">{book.title}</span>
                <span className="badge badge--section">{book.category}</span>
              </div>
              <div className="book-mobile-card__details">
                <div className="book-mobile-card__detail">
                  <span className="book-mobile-card__label">Author:</span>
                  <span className="book-mobile-card__value">{book.author}</span>
                </div>
                <div className="book-mobile-card__detail">
                  <span className="book-mobile-card__label">ISBN:</span>
                  <span className="book-mobile-card__value">{book.isbn}</span>
                </div>
                <div className="book-mobile-card__detail">
                  <span className="book-mobile-card__label">Available:</span>
                  <span className="book-mobile-card__value">{book.available} / {book.copies} copies</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      <div className="card">
        <h3 className="card__title">Borrowed Books</h3>
        <DataTable
          columns={borrowedColumns}
          data={borrowed}
          renderRow={(item) => (
            <tr key={item.id}>
              <td><strong>{item.student}</strong></td>
              <td>{item.book}</td>
              <td>{formatDate(item.issueDate)}</td>
              <td>{formatDate(item.dueDate)}</td>
              <td><StatusBadge status={item.status} /></td>
            </tr>
          )}
          renderMobileCard={(item) => (
            <div className="borrowed-mobile-card">
              <div className="borrowed-mobile-card__header">
                <span className="borrowed-mobile-card__student">{item.student}</span>
                <StatusBadge status={item.status} />
              </div>
              <div className="borrowed-mobile-card__details">
                <div className="borrowed-mobile-card__detail">
                  <span className="borrowed-mobile-card__label">Book:</span>
                  <span className="borrowed-mobile-card__value">{item.book}</span>
                </div>
                <div className="borrowed-mobile-card__detail">
                  <span className="borrowed-mobile-card__label">Issue Date:</span>
                  <span className="borrowed-mobile-card__value">{formatDate(item.issueDate)}</span>
                </div>
                <div className="borrowed-mobile-card__detail">
                  <span className="borrowed-mobile-card__label">Due Date:</span>
                  <span className="borrowed-mobile-card__value">{formatDate(item.dueDate)}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
