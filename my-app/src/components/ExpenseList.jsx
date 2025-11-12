export default function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      <h2>Recent Expenses</h2>
      {expenses.map(expense => (
        <div key={expense.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
          <p><strong>{expense.description}</strong> - ${expense.amount}</p>
          <small>{expense.category} • {expense.date}</small>
          <button onClick={() => onDelete(expense.id)} style={{ marginLeft: '1rem' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}