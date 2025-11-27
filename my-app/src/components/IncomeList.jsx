export default function IncomeList({ income, onDelete }) {
  return (
    <div>
      <h2>Recent Income</h2>
      {income.map(income => (
        <div key={income.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
          <p><strong>{income.description}</strong> - ${income.amount}</p>
          <small>{income.date}</small>
          <button onClick={() => onDelete(income.id)} style={{ marginLeft: '1rem' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}