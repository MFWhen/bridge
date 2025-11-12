import React from 'react';

function ExpenseItem({ expense, onDelete }) {
  return (
    <div className="expense-item">
      <div className="expense-details">
        <p className="expense-description">{expense.description}</p>
        <span className="expense-meta">
          {expense.category} • {expense.date}
        </span>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span className="expense-amount">${expense.amount}</span>
        {onDelete && (
          <button 
            className="delete-btn"
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ExpenseItem;