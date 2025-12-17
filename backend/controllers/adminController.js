const User = require("../models/users");
const Expense = require("../models/expenses");
const Income = require("../models/income");

const getAllData = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const expenses = await Expense.find();
    const income = await Income.find();

    res.status(200).json({
      users,
      expenses,
      income
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching admin data" });
  }
};

module.exports = {
  getAllData
};
