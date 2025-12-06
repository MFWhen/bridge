import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IncomeList from './IncomeList';
import AddIncomeForm from './AddIncomeForm';
import { getIncome, addIncome as addIncomeAPI, deleteIncome as deleteIncomeAPI, isLoggedIn } from '../utils/api';

export default function IncomePage() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    // Fetch income
    const fetchIncome = async () => {
      try {
        const data = await getIncome();
        setIncome(data.income || []);
      } catch (err) {
        console.error('Error fetching income:', err);
        setError('Failed to load income');
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, [navigate]);

  const addIncome = async (newIncome) => {
    console.log('Adding income:', newIncome);
    try {
      const data = await addIncomeAPI(newIncome);
      setIncome(prev => [data.income, ...prev]);
    } catch (error) {
      console.error('Error adding income:', error);
      alert('Failed to add income');
    }
  };

  const deleteIncome = async (id) => {
    try {
      await deleteIncomeAPI(id);
      setIncome(prev => prev.filter(income => income._id !== id));
    } catch (error) {
      console.error('Error deleting income:', error);
      alert('Failed to delete income');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <AddIncomeForm onAdd={addIncome} />
        <IncomeList income={income} onDelete={deleteIncome} />
      </div>
    </div>
  );
}