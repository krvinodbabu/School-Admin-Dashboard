import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'

export default function Settings() {
  return (
    <div className="page">
      <PageHeader title="Settings" subtitle="Configure school profile and system preferences" />

      <div className="settings-grid">
        <Card title="School Profile">
          <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              School Name
              <input type="text" defaultValue="Green Valley Public School" />
            </label>
            <label>
              Address
              <input type="text" defaultValue="123 Education Lane, Mumbai, Maharashtra" />
            </label>
            <label>
              Contact Email
              <input type="email" defaultValue="admin@greenvalleyschool.edu" />
            </label>
            <label>
              Phone
              <input type="tel" defaultValue="+91 22 1234 5678" />
            </label>
            <button type="submit" className="btn btn--primary">Save Changes</button>
          </form>
        </Card>

        <Card title="Academic Settings">
          <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Academic Year
              <select defaultValue="2025-26">
                <option value="2025-26">2025–26</option>
                <option value="2026-27">2026–27</option>
              </select>
            </label>
            <label>
              Grading System
              <select defaultValue="percentage">
                <option value="percentage">Percentage</option>
                <option value="gpa">GPA</option>
                <option value="letter">Letter Grade</option>
              </select>
            </label>
            <label>
              Attendance Threshold (%)
              <input type="number" defaultValue="75" min="0" max="100" />
            </label>
            <button type="submit" className="btn btn--primary">Save Changes</button>
          </form>
        </Card>

        <Card title="Notification Preferences">
          <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked /> Email notifications for fee reminders
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked /> SMS alerts for attendance
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Push notifications for exam schedules
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked /> Weekly summary reports
            </label>
            <button type="submit" className="btn btn--primary">Save Preferences</button>
          </form>
        </Card>
      </div>
    </div>
  )
}
