import PageHeader from '../components/PageHeader.jsx'
import { getNotifications } from '../services/dataService.js'
import { formatDate } from '../utils/helpers.js'

export default function Notifications() {
  const notifications = getNotifications()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="page">
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread of ${notifications.length} total`}
      />

      <div className="notifications-list">
        {notifications.map((n) => (
          <article key={n.id} className={`notification-card ${n.read ? '' : 'notification-card--unread'}`}>
            <div className="notification-card__header">
              <h3>{n.title}</h3>
              <span className="badge badge--section">{n.type}</span>
            </div>
            <p className="notification-card__message">{n.message}</p>
            <span className="notification-card__date">{formatDate(n.date)}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
