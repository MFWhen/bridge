import { useState, useEffect } from 'react';
import Header from './components/Header';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { mockExpenses } from './data/mockData';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setExpenses(mockExpenses);
      setLoading(false);
    }, 1000);
  }, []);

  const addExpense = (newExpense) => {
    console.log('Adding expense:', newExpense); 
    try {
      setExpenses(prev => [...prev, newExpense]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div style={{ padding: '1rem' }}>
        <AddExpenseForm onAdd={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </div>
    </div>
  );
}