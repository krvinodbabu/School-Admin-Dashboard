import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import { Search, GraduationCap, Gift, Calendar, UserCheck } from 'lucide-react'

export default function AlumniNetwork() {
  const [search, setSearch] = useState('')
  const [donationAmount, setDonationAmount] = useState('')
  const [donations, setDonations] = useState([
    { donor: 'Vikram Mehta (Batch of 2012)', amount: '₹1,50,000', project: 'Science Lab Upgrade' },
    { donor: 'Neha Sen (Batch of 2015)', amount: '₹50,000', project: 'Scholarship Fund' }
  ])

  const alumniMembers = [
    { name: 'Dr. Vikram Mehta', batch: '2012', domain: 'Medical', company: 'AIIMS Delhi', location: 'Delhi' },
    { name: 'Neha Sen', batch: '2015', domain: 'Software', company: 'Google India', location: 'Bangalore' },
    { name: 'Rohan Sharma', batch: '2018', domain: 'Fintech', company: 'Razorpay', location: 'Mumbai' },
    { name: 'Divya Iyer', batch: '2010', domain: 'Law', company: 'Supreme Court', location: 'Delhi' }
  ]

  const filteredAlumni = alumniMembers.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.domain.toLowerCase().includes(search.toLowerCase()) ||
    a.company.toLowerCase().includes(search.toLowerCase())
  )

  const handleDonate = (e) => {
    e.preventDefault()
    if (!donationAmount) return
    const newDonation = {
      donor: 'You (Anonymous Alumni)',
      amount: '₹' + parseFloat(donationAmount).toLocaleString(),
      project: 'Global Library Upgrades'
    }
    setDonations(prev => [newDonation, ...prev])
    setDonationAmount('')
    alert('Thank you for your generous contribution of ' + newDonation.amount)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Alumni & Mentorship Network" 
        subtitle="Stay connected with our global alumni network, offer internships, and donate to campus campaigns."
        eyebrow="Alumni Relations"
      />

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <StatCard title="Registered Alumni" value="3,420" icon={GraduationCap} color="blue" trend="Active network" />
        <StatCard title="Active Mentors" value="184" icon={UserCheck} color="green" trend="Graduates advising students" />
        <StatCard title="Total Donations (Term)" value="₹12.4 Lakhs" icon={Gift} color="purple" trend="100% used for facilities" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
        
        {/* Left Column: Directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Alumni Directory" subtitle="Search by name, industry, or company.">
            <div className="topnav__search" style={{ display: 'flex', width: '100%', marginBottom: '1.25rem' }}>
              <Search size={16} className="topnav__search-icon" style={{ marginTop: '0.25rem' }} />
              <input
                type="search"
                placeholder="Search alumni by name, tech stack, legal, AI..."
                className="topnav__search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredAlumni.map((alum, i) => (
                <div key={i} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem' }}>{alum.name} (Class of {alum.batch})</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{alum.domain} at <strong>{alum.company}</strong></span>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={() => alert(`Connection request sent to ${alum.name}`)}>
                    Request Mentorship
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Fundraising & Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <Card title="Support Campus Upgrades" subtitle="Fund local scholarships and lab setups.">
            <form onSubmit={handleDonate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.5rem' }}>Donation Amount (INR)</label>
                <input 
                  type="number" 
                  className="ap-input" 
                  placeholder="Enter amount (e.g. 10000)" 
                  value={donationAmount} 
                  onChange={e => setDonationAmount(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Contribute Now</button>
            </form>

            <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '1.5rem', paddingTop: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>Recent Contributions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {donations.map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{d.donor}</span>
                    <strong style={{ color: 'var(--color-green)' }}>{d.amount}</strong>
                  </div>
                ))}
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
