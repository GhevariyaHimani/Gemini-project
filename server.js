const express = require("express");
const { connect } = require("mongoose");
const connectDb = require("./config/dbconnection");
const errorhandle = require("./middelware/errorhandle");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

connectDb();
app.use(express.json());
app.use("/api", require("./routes/userroute"));
app.use("/api/chats", require("./routes/chatroute"))
app.use(errorhandle);
app.listen(port, "localhost", () => console.log(`http://localhost:${port}`));