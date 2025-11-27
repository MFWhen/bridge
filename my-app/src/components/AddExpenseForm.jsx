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
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>Add New Expense</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={{ margin: '0.5rem', padding: '0.5rem' }}
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        style={{ margin: '0.5rem', padding: '0.5rem' }}
      >
        {expenseCategories.map(cat => <option key={cat}>{cat}</option>)}
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ margin: '0.5rem', padding: '0.5rem' }}
      />
      <button type="submit" style={{ margin: '0.5rem', padding: '0.5rem' }}>
        Add Expense
      </button>
    </form>
  );
}