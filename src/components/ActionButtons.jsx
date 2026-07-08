/** Placeholder action buttons for table rows (View / Edit / Delete) */
import { Eye, Pencil, Trash2 } from 'lucide-react'

export default function ActionButtons({ onView, onEdit, onDelete }) {
  return (
    <div className="action-buttons">
      <button type="button" className="btn-icon" title="View" onClick={onView}>
        <Eye size={16} />
      </button>
      <button type="button" className="btn-icon btn-icon--edit" title="Edit" onClick={onEdit}>
        <Pencil size={16} />
      </button>
      <button type="button" className="btn-icon btn-icon--delete" title="Delete" onClick={onDelete}>
        <Trash2 size={16} />
      </button>
    </div>
  )
}

/** Placeholder handler — shows alert for demo purposes */
export function placeholderAction(action, item) {
  alert(`${action} action clicked (placeholder). Item: ${JSON.stringify(item, null, 0).slice(0, 80)}…`)
}
