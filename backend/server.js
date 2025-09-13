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
app.use(cors({
    origin: 'https://todo-app01-01.netlify.app',
    credentials: true
}));

app.use('/api/todos', todoRouter);
app.use('/api/user', userRouter);

app.get('/',(req,res) => {
    res.send("this is homempage!")
})

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on ${PORT}`);
})