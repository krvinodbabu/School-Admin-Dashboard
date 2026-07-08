/** Colored status badge for tables */
import { getStatusClass } from '../utils/helpers.js'

export default function StatusBadge({ status }) {
  return <span className={`badge ${getStatusClass(status)}`}>{status}</span>
}
