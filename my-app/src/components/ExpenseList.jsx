export default function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      <h2>Recent Expenses</h2>
      {expenses.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          color: '#6b7280',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
        }}>
          <p style={{ fontSize: '1.1em' }}>No expenses yet. Start tracking your spending!</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
        }}>
          {expenses.map(expense => (
            <div
              key={expense._id}
              style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s ease',
                borderLeft: '4px solid #ef4444',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'}
            >
              <div>
                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  color: '#2d3748',
                  fontSize: '1.1em',
                  fontWeight: '600'
                }}>
                  {expense.description}
                </h4>
                <p style={{
                  margin: '0.5rem 0',
                  color: '#6b7280',
                  fontSize: '0.9em'
                }}>
                  <span style={{ fontWeight: '500' }}>{expense.category}</span>
                </p>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem'
              }}>
                <div>
                  <p style={{
                    margin: 0,
                    fontSize: '1.5em',
                    fontWeight: '700',
                    color: '#ef4444'
                  }}>
                    ${expense.amount.toFixed(2)}
                  </p>
                  <small style={{ color: '#9ca3af', fontSize: '0.85em' }}>
                    {expense.date}
                  </small>
                </div>
                <button
                  onClick={() => onDelete(expense._id)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.85em',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                  onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}