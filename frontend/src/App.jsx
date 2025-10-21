import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReportForm from './ReportForm';
import ReportViewer from './ReportViewer';

function App() {
  return (
    <Router>
      <nav style={{ margin: 16 }}>
        <Link to="/" style={{ marginRight: 16 }}>Build Report</Link>
        <Link to="/report">View Report</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ReportForm />} />
        <Route
          path="/report"
          element={
            <ReportViewer reportUrl="https://app.powerbi.com/reportEmbed?reportId=7166f64c-25ce-41f9-801b-612dcc4b69a3&autoAuth=true&ctid=b8df9d33-6263-4b33-b343-6d456add7e5f" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;