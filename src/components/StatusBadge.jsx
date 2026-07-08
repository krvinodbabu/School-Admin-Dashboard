/**
 * Status badge with colored dot indicator.
 * Uses CSS class-based coloring from the design system.
 */
import { getStatusClass } from '../utils/helpers.js'

export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${getStatusClass(status)}`}>
      {status}
    </span>
  )
}
