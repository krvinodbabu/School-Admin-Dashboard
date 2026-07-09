import { useState } from 'react'
import { useTenant } from '../context/TenantContext.jsx'
import { ORG_STRUCTURE } from '../tenant/tenantData.js'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { List, Folder, File, Layers, ChevronRight, Search, Building } from 'lucide-react'

export default function OrganizationExplorer() {
  const { activeGroup } = useTenant()
  const [view, setView] = useState('tree') // 'tree' | 'card' | 'hierarchy'
  const [searchQuery, setSearchQuery] = useState('')

  // Recursively check if a node or its children match the search query
  const matchesSearch = (node, query) => {
    if (!query) return true
    if (node.name.toLowerCase().includes(query.toLowerCase())) return true
    if (node.children) {
      return node.children.some(child => matchesSearch(child, query))
    }
    return false
  }

  // Recursive Tree Renderer
  const renderTree = (node, depth = 0) => {
    if (!matchesSearch(node, searchQuery)) return null

    const isGroup = node.type === 'Group'
    const isInst = node.type === 'Institution'
    const isCamp = node.type === 'Campus'
    const isDept = node.type === 'Department'
    const isTeam = node.type === 'Team'

    return (
      <div key={node.name} style={{ marginLeft: depth * 16, borderLeft: depth > 0 ? '1px dashed var(--color-border)' : 'none', paddingLeft: depth > 0 ? '10px' : 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.45rem 0.625rem',
          borderRadius: 'var(--radius)',
          background: depth === 0 ? 'var(--color-surface-3)' : 'transparent',
          margin: '0.2rem 0'
        }}>
          {isGroup && <Layers size={14} color="var(--color-brand)" />}
          {isInst && <Building size={14} color="var(--color-indigo)" />}
          {isCamp && <Folder size={14} color="var(--color-green)" />}
          {isDept && <Folder size={14} color="var(--color-amber)" />}
          {isTeam && <Folder size={14} color="var(--color-blue)" />}
          {node.type === 'User' && <File size={12} color="var(--color-text-muted)" />}

          <span style={{ fontSize: '0.85rem', fontWeight: depth < 3 ? 700 : 500, color: 'var(--color-text)' }}>
            {node.name}
          </span>
          <span className="badge" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>{node.type}</span>
        </div>

        {node.children && node.children.map(child => renderTree(child, depth + 1))}
      </div>
    )
  }

  // Recursive Card Flattener
  const flattenNodes = (node, accum = []) => {
    if (matchesSearch(node, searchQuery)) {
      accum.push({ name: node.name, type: node.type })
    }
    if (node.children) {
      node.children.forEach(child => flattenNodes(child, accum))
    }
    return accum
  }

  const flattenedList = flattenNodes(ORG_STRUCTURE)

  return (
    <div className="page animate-fadeIn">
      <PageHeader
        title="Organizational Explorer"
        subtitle={`Directory structure representation for the ${activeGroup.name}`}
        eyebrow="Tenant Infrastructure"
      />

      {/* Toolbar */}
      <div className="card ap-inline-filters" style={{ marginBottom: '1.25rem' }}>
        <div className="ap-view-tabs">
          {[['tree', 'Tree List'], ['card', 'Flattened Cards'], ['hierarchy', 'Visual Flow']].map(([v, label]) => (
            <button
              key={v}
              type="button"
              className={`ap-view-tab ${view === v ? 'ap-view-tab--active' : ''}`}
              onClick={() => setView(v)}
            >
              {label}
            </button>
          ))}
        </div>
        
        <div className="ap-filter-divider" />

        <div className="ap-search" style={{ flex: 1, maxWidth: '280px' }}>
          <Search size={14} className="ap-search__icon" />
          <input 
            type="search"
            className="ap-search__input"
            placeholder="Search hierarchy nodes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            id="org-search-input"
          />
        </div>
      </div>

      {/* RENDER VIEWS */}
      {view === 'tree' && (
        <Card title="Structural Tree View" subtitle="Expandable hierarchical node representation">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0.5rem 0' }}>
            {renderTree(ORG_STRUCTURE)}
          </div>
        </Card>
      )}

      {view === 'card' && (
        <div className="ap-card-grid">
          {flattenedList.length === 0 && (
            <div className="ap-empty card" style={{ gridColumn: '1 / -1' }}>
              <Search size={40} style={{ opacity: 0.2 }} />
              <p>No directories matched your filters.</p>
            </div>
          )}
          {flattenedList.map(node => (
            <div key={node.name} className="card" style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text)' }}>{node.name}</span>
                <span className="badge badge--section">{node.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'hierarchy' && (
        <Card title="Visual Flow Chart" subtitle="Visual tree map of institutional dependencies">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1.5rem', 
            padding: '2rem 0',
            overflowX: 'auto'
          }}>
            <div className="card" style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-3)', border: '1px solid var(--color-brand)' }}>
              <strong>{ORG_STRUCTURE.name}</strong> <span className="badge">Group</span>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              {ORG_STRUCTURE.children.map(inst => (
                <div key={inst.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div className="card" style={{ padding: '0.5rem 1rem', border: '1px solid var(--color-indigo)' }}>
                    <strong>{inst.name}</strong> <span className="badge">Institution</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {inst.children.map(camp => (
                      <div key={camp.name} className="card" style={{ padding: '0.5rem 0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--color-green)' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{camp.name}</span>
                        <span className="badge" style={{ fontSize: '0.6rem' }}>Campus</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
