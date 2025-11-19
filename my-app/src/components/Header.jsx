function Header() {
  return (
    <header style={{ background: '#2563eb', color: 'white', padding: '1rem'}}>
       <h1 style={{ 
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 900,   
        fontStyle: 'oblique',
        fontStretch: 'condensed',
        WebkitTextStroke: '2px black', 
        color: 'white'         
      }}>Bridge Expense Manager</h1>
    </header>
  );
}
export default Header;