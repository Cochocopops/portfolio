export default function LayoutJsRoutePage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'black', fontSize: '2rem' }}>Layout-js Route</h1>
        <p style={{ color: '#555' }}>This page replaces the folder that conflicted with `layout.js`.</p>
      </div>
    </main>
  );
}
