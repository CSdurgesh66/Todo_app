const express = require('express');
require("dotenv").config();
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");

const cors = require('cors');

const app = express();

const PORT = process.env.PORT;

const todoRouter = require('./routes/todo.route');
const userRouter = require('./routes/user.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/todos', todoRouter);
app.use('/api/user', userRouter);



app.listen(PORT, () => {
    connectDB();
    console.log("server is running on 5000");
})