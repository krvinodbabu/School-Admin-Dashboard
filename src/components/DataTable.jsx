/** Generic data table wrapper with responsive mobile card layout */
export default function DataTable({ columns, data, renderRow, renderMobileCard }) {
  return (
    <div className="data-table-container">
      {/* Desktop and Tablet Table View */}
      <div className="table-wrapper desktop-only">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="data-table__empty">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, index) => renderRow(row, index))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (visible only on mobile viewports) */}
      <div className="mobile-only mobile-cards-list">
        {data.length === 0 ? (
          <div className="data-table__empty">No records found.</div>
        ) : (
          data.map((row, index) => (
            <div key={row.id || index} className="mobile-card">
              {renderMobileCard ? (
                renderMobileCard(row, index)
              ) : (
                <div className="mobile-card__default-content">
                  {columns.map((col) => {
                    const value = row[col.key]
                    if (col.key === 'actions' || typeof value === 'object') return null
                    return (
                      <div key={col.key} className="mobile-card__row">
                        <span className="mobile-card__label">{col.label}:</span>
                        <span className="mobile-card__value">
                          {value === undefined || value === null ? '—' : String(value)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

