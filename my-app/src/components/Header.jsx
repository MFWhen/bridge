function Header() {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      color: 'white',
      padding: '1.2rem 1rem',
      position: 'fixed',
      top: -15,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 900,
          fontStyle: 'oblique',
          fontStretch: 'condensed',
          WebkitTextStroke: '2px black',
          color: 'white',
          margin: 0,
          padding: 0,
          letterSpacing: '-0.5px'
        }}>
          Bridge Expense Manager
        </h1>
      </div>
    </header>
  );
}
export default Header;