import { useLocation } from 'react-router-dom';

function ReportViewer({ reportUrl }) {
  const location = useLocation();
  const data = location.state || {};

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      background: '#fff',
      zIndex: 1000
    }}>
      <h2 style={{ margin: '16px 0 0 16px' }}>Power BI Report Viewer</h2>
      <pre style={{
        background: '#f4f4f4',
        padding: 16,
        margin: '16px',
        maxHeight: '20vh',
        overflow: 'auto'
      }}>
      </pre>
      {reportUrl && (
        <iframe
          src={reportUrl}
          width="100%"
          height="70%"
          style={{
            border: 0,
            marginTop: 0,
            display: 'block'
          }}
          title="Power BI Report"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default ReportViewer;