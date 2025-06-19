import { useState } from 'react'
import './App.css'

function App() {
  // Working hours related states
  const [workingDays, setWorkingDays] = useState(22)
  const [hoursPerDay, setHoursPerDay] = useState(8.75)
  const [workedHours, setWorkedHours] = useState(0)
  const [monthlySalary, setMonthlySalary] = useState(0)

  // Calculate expected and actual hours
  const expectedHours = workingDays * hoursPerDay
  const unworkedHours = Math.max(0, expectedHours - workedHours)
  const perHourSalary = monthlySalary / expectedHours
  const deduction = unworkedHours * perHourSalary
  const finalSalary = monthlySalary - deduction

  return (
    <div className="salary-calculator">
      <h1>Monthly Salary Calculator</h1>

      <div className="calculator-container">
        <div className="input-section">
          <div className="input-group">
            <label>Total Working Days in Month</label>
            <input
              type="number"
              value={workingDays}
              onChange={(e) => setWorkingDays(Number(e.target.value))}
              placeholder="Enter working days"
              min="1"
              max="31"
            />
          </div>

          <div className="input-group">
            <label>Working Hours per Day</label>
            <input
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              placeholder="Enter hours per day"
              min="1"
              max="24"
              step="0.25"
            />
          </div>

          <div className="input-group">
            <label>Total Worked Hours in Month</label>
            <input
              type="number"
              value={workedHours}
              onChange={(e) => setWorkedHours(Number(e.target.value))}
              placeholder="Enter worked hours"
              min="0"
            />
          </div>

          <div className="input-group">
            <label>Monthly Salary (₹)</label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              placeholder="Enter monthly salary"
              min="0"
            />
          </div>
        </div>

        <div className="summary-section">
          <h2>Salary Breakdown</h2>
          <div className="summary-card">
            <div className="summary-item">
              <span>Expected Working Hours:</span>
              <span>{expectedHours} hours</span>
            </div>
            <div className="summary-item">
              <span>Actual Worked Hours:</span>
              <span>{workedHours} hours</span>
            </div>
            {unworkedHours > 0 && (
              <>
                <div className="summary-item warning">
                  <span>Unworked Hours:</span>
                  <span>{unworkedHours} hours</span>
                </div>
                <div className="summary-item">
                  <span>Per Hour Salary:</span>
                  <span>₹{perHourSalary.toFixed(2)}</span>
                </div>
                <div className="summary-item warning">
                  <span>Deduction Amount:</span>
                  <span>₹{deduction.toFixed(2)}</span>
                </div>
                <div className="summary-item warning">
                  <span>Deduction Percentage:</span>
                  <span>{((deduction / monthlySalary) * 100).toFixed(2)}%</span>
                </div>
              </>
            )}
            <div className="summary-item total">
              <span>Final Payable Salary:</span>
              <span>₹{finalSalary.toFixed(2)}</span>
            </div>
          </div>

          <div className="info-box">
            <p>
              {unworkedHours > 0
                ? `Note: There is a deficit of ${unworkedHours} hours, resulting in a deduction of ₹${deduction.toFixed(2)}`
                : 'Note: No deficit in working hours. Full salary will be paid.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
