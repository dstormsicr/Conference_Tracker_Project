import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportForm.css';

const initialState = {
  EventID: '',
  StartDate: '',
  EndDate: '',
  EventType: '',
  EventHost: '',
  EventName: '',
  Location: '',
  EventDescription: '',
  Agenda: '',
  ICRAttendees: '',
  ClientAttendees: '',
  Rating: '',
  PostEventNotes: '',
  RegistrationLink: '',
};

function ReportForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/report', { state: { ...form, id: data.id } });
      } else {
        setError(data.message || 'Failed to create event');
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="report-form-header">Build Power BI Report</h2>
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}
        {Object.keys(initialState).map((key) => (
          <div key={key} className="form-group">
            <label className="form-label">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </label>
            <input
              type={key.includes('Date') ? 'datetime-local' : 'text'}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            />
          </div>
        ))}
        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Submitting...' : 'Generate Report'}
        </button>
      </form>
    </div>
  );
}

export default ReportForm;