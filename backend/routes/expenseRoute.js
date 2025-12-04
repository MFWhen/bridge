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
expenseRoute.get("/expenses", getExpenses); 
expenseRoute.get("/expenses/:id", isAuth,isAuthorized(['user']), getOneExpense); 
expenseRoute.post("/expenses", postExpense); 
expenseRoute.put("/expenses/:id", putExpense); 
expenseRoute.delete("/expenses/:id",isAuth,isAuthorized(['admin']), deleteExpense); 
module.exports = expenseRoute;