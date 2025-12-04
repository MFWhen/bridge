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
incomeRoute.get("/income", getIncome); 
incomeRoute.get("/income/:id", isAuth,isAuthorized(['user']), getOneIncome); 
incomeRoute.post("/income", postIncome); 
incomeRoute.put("/income/:id", putIncome); 
incomeRoute.delete("/income/:id",isAuth,isAuthorized(['admin']), deleteIncome); 
module.exports = incomeRoute;