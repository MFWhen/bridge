import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';
import { getExpenses, addExpense as addExpenseAPI, deleteExpense as deleteExpenseAPI, isLoggedIn } from '../utils/api';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data.expenses || []);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError('Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [navigate]);

  const addExpense = async (newExpense) => {
    console.log('Adding expense:', newExpense);
    try {
      const data = await addExpenseAPI(newExpense);
      setExpenses(prev => [data.expense, ...prev]);
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await deleteExpenseAPI(id);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <AddExpenseForm onAdd={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </div>
    </div>
  );
}