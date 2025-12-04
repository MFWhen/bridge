const express = require("express");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const connectDb = require("./config/connectdb");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT;

connectDb();

app.use(cors());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", expenseRoute);

app.listen(port, (err) => {
  if (err) {
    console.error("Server Failed", err.message);
  } else console.log(`Server Started at PORT ${port} `);
});
