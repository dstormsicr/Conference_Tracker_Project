import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  ID: '',
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send data to your backend API
    // For now, just navigate to the report page
    navigate('/report', { state: form });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Build Power BI Report</h2>
      {Object.keys(initialState).map((key) => (
        <div key={key} style={{ marginBottom: 12 }}>
          <label>
            {key}:<br />
            <input
              type="text"
              name={key}
              value={form[key]}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      ))}
      <button type="submit">Generate Report</button>
    </form>
  );
}

export default ReportForm;