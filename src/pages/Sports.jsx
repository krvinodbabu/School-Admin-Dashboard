import { useState } from 'react'
import { Trophy, Medal, Home, TreePine, Users, Calendar } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import Card from '../components/Card.jsx'
import DataTable from '../components/DataTable.jsx'
import { getSportsData } from '../services/dataService.js'
import { formatDate } from '../utils/helpers.js'

const rankColumns = [
  { key: 'rank', label: 'Rank' },
  { key: 'class', label: 'Class' },
  { key: 'totalPoints', label: 'Total Points' },
  { key: 'gold', label: 'Gold' },
  { key: 'silver', label: 'Silver' },
  { key: 'bronze', label: 'Bronze' },
  { key: 'topSport', label: 'Best Sport' },
]

function RankBadge({ rank }) {
  if (rank === 1) return <span className="rank-badge rank-badge--gold"><Trophy size={14} /> 1st</span>
  if (rank === 2) return <span className="rank-badge rank-badge--silver"><Medal size={14} /> 2nd</span>
  if (rank === 3) return <span className="rank-badge rank-badge--bronze"><Medal size={14} /> 3rd</span>
  return <span className="rank-badge rank-badge--default">{rank}th</span>
}

function Podium({ rankings }) {
  const top3 = rankings.slice(0, 3)
  const order = [top3[1], top3[0], top3[2]]

  return (
    <div className="podium">
      {order.map((item) =>
        item ? (
          <div key={item.class} className={`podium__item podium__item--${item.rank}`}>
            <div className="podium__bar">
              <RankBadge rank={item.rank} />
              <strong>{item.class}</strong>
              <span>{item.totalPoints} pts</span>
            </div>
          </div>
        ) : null,
      )}
    </div>
  )
}

export default function Sports() {
  const [activeTab, setActiveTab] = useState('indoor')
  const { summary, indoorSports, outdoorSports, classRankings, sportWiseRanks } = getSportsData()

  const isIndoor = activeTab === 'indoor'
  const sports = isIndoor ? indoorSports : outdoorSports
  const rankings = isIndoor ? classRankings.indoor : classRankings.outdoor
  const sportRanks = isIndoor ? sportWiseRanks.indoor : sportWiseRanks.outdoor

  return (
    <div className="page">
      <PageHeader
        title="Sports Activities"
        subtitle="Indoor & outdoor events with class-wise championship rankings"
      />

      <div className="stats-grid stats-grid--4">
        <StatCard title="Indoor Events" value={summary.indoorEvents} icon={Home} color="indigo" />
        <StatCard title="Outdoor Events" value={summary.outdoorEvents} icon={TreePine} color="green" />
        <StatCard title="Participating Classes" value={summary.participatingClasses} icon={Users} color="blue" />
        <StatCard title="Sports Day" value={formatDate(summary.sportsDayDate)} icon={Calendar} color="amber" />
      </div>

      <div className="sports-tabs">
        <button
          type="button"
          className={`sports-tabs__btn ${isIndoor ? 'sports-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('indoor')}
        >
          <Home size={18} /> Indoor Sports
        </button>
        <button
          type="button"
          className={`sports-tabs__btn ${!isIndoor ? 'sports-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('outdoor')}
        >
          <TreePine size={18} /> Outdoor Sports
        </button>
      </div>

      <div className="dashboard-grid dashboard-grid--2">
        <Card title={`${isIndoor ? 'Indoor' : 'Outdoor'} Activities`}>
          <div className="sports-list">
            {sports.map((sport) => (
              <div key={sport.id} className="sports-list__item">
                <div className="sports-list__info">
                  <strong>{sport.name}</strong>
                  <span>{sport.venue} · Coach: {sport.coach}</span>
                </div>
                <span className="badge badge--section">{sport.participants} players</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top 3 Classes — Championship Podium">
          <Podium rankings={rankings} />
        </Card>
      </div>

      <div className="card">
        <h3 className="card__title">Overall Class-wise Rankings — {isIndoor ? 'Indoor' : 'Outdoor'}</h3>
        <DataTable
          columns={rankColumns}
          data={rankings}
          renderRow={(row) => (
            <tr key={row.rank} className={row.rank <= 3 ? `rank-row rank-row--${row.rank}` : ''}>
              <td><RankBadge rank={row.rank} /></td>
              <td><strong>{row.class}</strong></td>
              <td>{row.totalPoints}</td>
              <td className="text-gold">{row.gold}</td>
              <td className="text-silver">{row.silver}</td>
              <td className="text-bronze">{row.bronze}</td>
              <td>{row.topSport}</td>
            </tr>
          )}
          renderMobileCard={(row) => (
            <div className={`sports-rank-mobile-card ${row.rank <= 3 ? `sports-rank-mobile-card--${row.rank}` : ''}`}>
              <div className="sports-rank-mobile-card__header">
                <span className="sports-rank-mobile-card__class">Class: {row.class}</span>
                <RankBadge rank={row.rank} />
              </div>
              <div className="sports-rank-mobile-card__details">
                <div className="sports-rank-mobile-card__detail">
                  <span className="sports-rank-mobile-card__label">Total Points:</span>
                  <span className="sports-rank-mobile-card__value">{row.totalPoints}</span>
                </div>
                <div className="sports-rank-mobile-card__detail">
                  <span className="sports-rank-mobile-card__label">Medals (G/S/B):</span>
                  <span className="sports-rank-mobile-card__value">
                    <span className="text-gold">{row.gold}</span> / <span className="text-silver">{row.silver}</span> / <span className="text-bronze">{row.bronze}</span>
                  </span>
                </div>
                <div className="sports-rank-mobile-card__detail">
                  <span className="sports-rank-mobile-card__label">Best Sport:</span>
                  <span className="sports-rank-mobile-card__value">{row.topSport}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      <h2 className="section-heading">Sport-wise Class Rankings</h2>
      <div className="sport-ranks-grid">
        {sportRanks.map((item) => (
          <Card key={item.sport} title={item.sport}>
            <table className="mini-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Class</th>
                  <th>Points</th>
                  <th>Star Player</th>
                </tr>
              </thead>
              <tbody>
                {item.rankings.map((r) => (
                  <tr key={r.rank}>
                    <td><RankBadge rank={r.rank} /></td>
                    <td><strong>{r.class}</strong></td>
                    <td>{r.points}</td>
                    <td>{r.starPlayer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ))}
      </div>
    </div>
  )
}
