/** Simple bar chart using CSS — no external chart library needed */
export default function BarChart({ data, valueKey = 'percentage', labelKey = 'month', height = 180 }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1)

  return (
    <div className="bar-chart" style={{ height }}>
      {data.map((item, i) => (
        <div key={i} className="bar-chart__item">
          <div className="bar-chart__bar-wrap">
            <div
              className="bar-chart__bar"
              style={{ height: `${(item[valueKey] / max) * 100}%` }}
              title={`${item[labelKey]}: ${item[valueKey]}`}
            />
          </div>
          <span className="bar-chart__label">{item[labelKey]}</span>
        </div>
      ))}
    </div>
  )
}
