/** Reusable stat card for dashboard and summary sections */
export default function StatCard({ title, value, icon: Icon, trend, color = 'blue' }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__content">
        <p className="stat-card__title">{title}</p>
        <h3 className="stat-card__value">{value}</h3>
        {trend && <span className="stat-card__trend">{trend}</span>}
      </div>
      <div className="stat-card__icon">
        <Icon size={28} />
      </div>
    </div>
  )
}
