import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { Leaf, Zap, Droplets, Trash2 } from 'lucide-react'

export default function SustainabilityESG() {
  
  const energyMock = [
    { label: 'Jun', value: 120 },
    { label: 'Jul', value: 115 },
    { label: 'Aug', value: 110 },
    { label: 'Sep', value: 98 },
    { label: 'Oct', value: 92 }
  ]

  const wasteMock = [
    { label: 'Recycled', value: 68, color: '#22c55e' },
    { label: 'Composted', value: 20, color: '#a855f7' },
    { label: 'Landfill', value: 12, color: '#ef4444' }
  ]

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Sustainability & ESG Dashboard" 
        subtitle="Track our campus green initiatives, daily solar grid performance, and waste recycling rates."
        eyebrow="Green Campus"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <StatCard title="ESG Health Rating" value="A+ (92/100)" icon={Leaf} color="green" trend="Carbon neutral ready" />
        <StatCard title="Solar Grid Feed" value="4.8 MWh" icon={Zap} color="blue" trend="38% of campus power" />
        <StatCard title="Water Saved (Gal)" value="124,000" icon={Droplets} color="indigo" trend="Rainwater recycling active" />
        <StatCard title="Recycled Waste" value="88%" icon={Trash2} color="purple" trend="Zero landfill goal" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        
        {/* Energy Consumption chart */}
        <Card title="Monthly Campus Energy Consumption (MWh)" subtitle="Includes solar offsets & grid power logs">
          <div style={{ height: '300px', padding: '1rem 0' }}>
            <BarChart data={energyMock} labelKey="label" valueKey="value" />
          </div>
        </Card>

        {/* Waste division donut */}
        <Card title="Waste Distribution Index" subtitle="Recycling & Compost audit logs">
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={wasteMock} />
          </div>
        </Card>

      </div>
    </div>
  )
}
