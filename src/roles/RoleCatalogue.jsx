import { useState } from 'react'
import { ROLE_CATALOGUE } from './rolesConfig.js'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { Search, ShieldAlert, Award, Star, Compass } from 'lucide-react'

export default function RoleCatalogue() {
  const [search, setSearch] = useState('')

  const filteredCatalogue = ROLE_CATALOGUE.map(cat => {
    const matchingRoles = cat.roles.filter(r => 
      r.label.toLowerCase().includes(search.toLowerCase()) || 
      r.desc.toLowerCase().includes(search.toLowerCase())
    )
    return { ...cat, roles: matchingRoles }
  }).filter(cat => cat.roles.length > 0)

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Enterprise Role Catalogue" 
        subtitle="Explore and search predefined operating system roles across academic and operations divisions."
        eyebrow="Identity & Access"
      />

      <div className="topnav__search" style={{ display: 'flex', width: '100%', maxWidth: '480px', marginBottom: '2rem' }}>
        <Search size={16} className="topnav__search-icon" style={{ marginTop: '0.25rem' }} />
        <input
          type="search"
          placeholder="Search catalog roles, descriptions..."
          className="topnav__search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {filteredCatalogue.map((cat, i) => (
          <div key={i}>
            <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.25rem' }}>{cat.category}</h2>
              <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>{cat.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {cat.roles.map(r => (
                <div key={r.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{r.label}</h3>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={14} />
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5, flex: 1 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredCatalogue.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            No roles matched your search queries. Try search terms like "Teacher", "Admin", or "Super".
          </div>
        )}
      </div>
    </div>
  )
}
