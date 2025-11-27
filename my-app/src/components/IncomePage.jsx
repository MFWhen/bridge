import React, { useState, useEffect } from 'react';
import IncomeList from './IncomeList';
import AddIncomeForm from './AddIncomeForm';
import { mockIncome } from '../data/mockdata';

export default function IncomePage() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIncome(mockIncome);
      setLoading(false);
    }, 1000);
  }, []);

  const addIncome = (newIncome) => {
    console.log('Adding income:', newIncome); 
    try {
      setIncome(prev => [...prev, newIncome]);
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const deleteIncome = (id) => {
    setIncome(prev => prev.filter(income => income.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <AddIncomeForm onAdd={addIncome} />
        <IncomeList income={income} onDelete={deleteIncome} />
      </div>
    </div>
  );
}