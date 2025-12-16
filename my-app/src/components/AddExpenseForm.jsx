import { useState } from 'react';
import { expenseCategories } from '../data/mockdata';

export default function AddExpenseForm({onAdd}) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(expenseCategories[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      amount: parseFloat(amount),
      category,
      description,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'white',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      alignItems: 'flex-end'
    }}>
      <div style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Add New Expense</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#374151',
          fontSize: '0.9em'
        }}>
          Amount
        </label>
        <input
          type="number"
          placeholder="0.00"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#374151',
          fontSize: '0.9em'
        }}>
          Category
        </label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          {expenseCategories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
        <label style={{
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#374151',
          fontSize: '0.9em'
        }}>
          Description
        </label>
        <input
          type="text"
          placeholder="What did you spend on?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{
        gridColumn: '1 / -1',
        padding: '0.8rem'
      }}>
        Add Expense
      </button>
    </form>
  );
}