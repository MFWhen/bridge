const Income = require("../models/income");
const jwt = require("jsonwebtoken"); 
require('dotenv').config(); 


const getIncome = async (req, res) => {
  try {

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ msg: "Authentication required" });
    }

    const income = await Income.find({ user: userId }).sort({ createdAt: -1 });
    if (income && income.length > 0) {
      return res.status(200).json({ income });
    }
    return res.status(200).json({ income: [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error fetching income" });
  }
};

const getOneIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) return res.status(404).json({ msg: "Income not found" });
    return res.status(200).json({ income });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error retrieving income" });
  }
};

const postIncome = async (req, res) => {
  const data = req.body;
  try {

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ msg: "Authentication required" });
    }
    const newIncome = new Income({ ...data, user: userId });
    await newIncome.save();
    return res.status(201).json({ income: newIncome, msg: "Income created" });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ msg: "Validation error", errors: messages });
    }
    return res.status(500).json({ msg: "Error creating income" });
  }
};

const putIncome = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const income = await Income.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!income) return res.status(404).json({ msg: "Income not found" });
    return res.status(200).json({ income, msg: "Income updated" });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ msg: "Validation error", errors: messages });
    }
    return res.status(500).json({ msg: "Error updating income" });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findByIdAndDelete(id);
    if (!income) return res.status(404).json({ msg: "Income not found" });
    return res.status(200).json({ msg: "Income deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error deleting income" });
  }
};

module.exports = {
  getIncome,
  getOneIncome,
  postIncome,
  putIncome,
  deleteIncome, 
};
