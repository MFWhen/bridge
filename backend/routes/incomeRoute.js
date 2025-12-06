const express = require("express"); 
const incomeRoute = express.Router(); 
const { 
getIncome,
getOneIncome,
postIncome,
putIncome,
deleteIncome, 
} = require("../controllers/incomeController"); 
const isAuth = require("../middleware/isAuth"); 
const isAuthorized = require("../middleware/isAuthorized");
incomeRoute.get("/income", isAuth, getIncome); 
incomeRoute.get("/income/:id", isAuth, getOneIncome); 
incomeRoute.post("/income", isAuth, postIncome); 
incomeRoute.put("/income/:id", isAuth, putIncome); 
incomeRoute.delete("/income/:id", isAuth, deleteIncome); 
module.exports = incomeRoute;