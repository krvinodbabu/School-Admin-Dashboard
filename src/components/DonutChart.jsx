/** Donut-style chart using conic-gradient for fee distribution */
export default function DonutChart({ data }) {
  let cumulative = 0
  const segments = data.map((item) => {
    const start = cumulative
    cumulative += item.value
    return `${item.color} ${start}% ${cumulative}%`
  })

  return (
    <div className="donut-chart">
      <div
        className="donut-chart__ring"
        style={{ background: `conic-gradient(${segments.join(', ')})` }}
      >
        <div className="donut-chart__center">
          <span>100%</span>
          <small>Total</small>
        </div>
      </div>
      <ul className="donut-chart__legend">
        {data.map((item) => (
          <li key={item.label}>
            <span className="donut-chart__dot" style={{ background: item.color }} />
            {item.label} ({item.value}%)
          </li>
        ))}
      </ul>
    </div>
  )
}
