const express = require("express");
const adminRoute = express.Router();
const { getAllData } = require("../controllers/adminController");
const isAuth = require("../middleware/isAuth");
const isAuthorized = require("../middleware/isAuthorized");

adminRoute.get("/admin/data", isAuth, isAuthorized(['admin']), getAllData);

module.exports = adminRoute;
