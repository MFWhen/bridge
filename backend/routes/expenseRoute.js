const express = require("express"); 
const expenseRoute = express.Router(); 
const { 
getExpenses,
getOneExpense,
postExpense,
putExpense,
deleteExpense, 
} = require("../controllers/expenseController"); 
const isAuth = require("../middleware/isAuth"); 
const isAuthorized = require("../middleware/isAuthorized");
expenseRoute.get("/expenses", isAuth, getExpenses); 
expenseRoute.get("/expenses/:id", isAuth, getOneExpense); 
expenseRoute.post("/expenses", isAuth, postExpense); 
expenseRoute.put("/expenses/:id", isAuth, putExpense); 
expenseRoute.delete("/expenses/:id", isAuth, deleteExpense); 
module.exports = expenseRoute;