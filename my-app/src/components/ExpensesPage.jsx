import React, { useState, useEffect } from 'react';
import axios from "axios"; 
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';
import { mockExpenses } from '../data/mockdata';



export default function ExpensesPage() {
  const url = "localhost:6006/api/expenses"
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    axios 
      .get(url) 
      .then((res) => { 
         setUsers(res.data.users); 
        console.log(res); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
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
      <div style={{ padding: '1rem' }}>
        <AddExpenseForm onAdd={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </div>
    </div>
  );
}