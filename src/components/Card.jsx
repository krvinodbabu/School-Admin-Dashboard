/**
 * Elevated card component with hover lift, optional header with action link.
 */
export default function Card({ title, subtitle, actionLabel, onAction, children }) {
  return (
    <div className="card">
      {(title || actionLabel) && (
        <div className="card__header">
          <div>
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {actionLabel && (
            <button
              type="button"
              className="card__action-link"
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
