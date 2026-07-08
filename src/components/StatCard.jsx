/**
 * Reusable stat card for dashboard and summary sections.
 * Features: gradient top bar, icon container, trend chip.
 */
import { TrendingUp } from 'lucide-react'

export default function StatCard({ title, value, icon: Icon, trend, color = 'blue' }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__row">
        <p className="stat-card__title">{title}</p>
        <div className="stat-card__icon">
          <Icon size={22} />
        </div>
      </div>
      <div>
        <h3 className="stat-card__value">{value}</h3>
        {trend && (
          <span className="stat-card__trend">
            <TrendingUp size={11} />
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}
