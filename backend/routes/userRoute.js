const express = require("express"); 
const userRoute = express.Router(); 
const { 
getUsers, 
postUser, 
putUser, 
deleteUser, 
getOneUser, 
 signIn, 
} = require("../controllers/userController"); 
const isAuth = require("../middleware/isAuth"); 
const isAuthorized = require("../middleware/isAuthorized");
userRoute.get("/users", getUsers); 
userRoute.get("/users/:id", isAuth,isAuthorized(['user']), getOneUser); 
userRoute.post("/users", postUser); 
userRoute.put("/users/:id", putUser); 
userRoute.delete("/users/:id",isAuth,isAuthorized(['admin']), deleteUser); 
userRoute.post("/signIn", signIn); 
module.exports = userRoute;