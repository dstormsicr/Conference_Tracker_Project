import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReportForm from './ReportForm';
import ReportViewer from './ReportViewer';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="nav-link nav-link-primary">
          Build Report
        </Link>
        <Link to="/report" className="nav-link nav-link-secondary">
          View Report
        </Link>
      </nav>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<ReportForm />} />
          <Route
            path="/report"
            element={
              <ReportViewer reportUrl="https://app.powerbi.com/reportEmbed?reportId=7166f64c-25ce-41f9-801b-612dcc4b69a3&autoAuth=true&ctid=b8df9d33-6263-4b33-b343-6d456add7e5f" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;