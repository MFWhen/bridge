const Expense = require("../models/expenses");
const jwt = require("jsonwebtoken"); 
require('dotenv').config(); 


const getExpenses = async (req, res) => {
  try {
 
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ msg: "Authentication required" });
    }

    const expenses = await Expense.find({ user: userId }).sort({ createdAt: -1 });
    if (expenses && expenses.length > 0) {
      return res.status(200).json({ expenses });
    }
    return res.status(200).json({ expenses: [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error fetching expenses" });
  }
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    return res.status(200).json({ expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error retrieving expense" });
  }
};

const postExpense = async (req, res) => {
  const data = req.body;
  try {
   
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ msg: "Authentication required" });
    }
    const newExpense = new Expense({ ...data, user: userId });
    await newExpense.save();
    return res.status(201).json({ expense: newExpense, msg: "Expense created" });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ msg: "Validation error", errors: messages });
    }
    return res.status(500).json({ msg: "Error creating expense" });
  }
};

const putExpense = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    return res.status(200).json({ expense, msg: "Expense updated" });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ msg: "Validation error", errors: messages });
    }
    return res.status(500).json({ msg: "Error updating expense" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    return res.status(200).json({ msg: "Expense deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error deleting expense" });
  }
};

module.exports = {
  getExpenses,
  getOneExpense,
  postExpense,
  putExpense,
  deleteExpense, 
};
