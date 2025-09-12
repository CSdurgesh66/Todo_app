const express = require("express");
const Todo = require("../models/todo");
require("dotenv").config();

const auth = require('../middleware/auth');

const router = express.Router();

// get all todos
router.get('/', auth, async (req, res) => {
    try {
        console.log("user id", req.user.id);
        const todos = await Todo.find({ user: req.user.id });
        console.log(todos);
        res.status(200).json({
            success: true,
            todos
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            messsage: err.messsage
        })
    }
});

// add new todo
router.post("/", auth, async (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text,
            user: req.user.id
        });

        const newTodo = await todo.save();
        res.status(200).json({
            success: true,
            newTodo
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            messsage: err.messsage
        })
    }

});

// update a todo (text or completed)
router.patch("/:id", auth, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            return res.status(404).json({
                success: false,
                messsage: "todo not found"
            });
        }

        if (req.body.text !== undefined) {
            todo.text = req.body.text;
        }
        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }
        const updatedTodo = await todo.save();
        res.status(200).json({
            success: true,
            updatedTodo
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            messsage: err.messsage
        })
    }
})

// delete todo 
router.delete("/:id", auth, async (req, res) => {
    try {

        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
        res.status(200).json({
            success: true,
            messsage: "Todo deleted"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            messsage: err.messsage
        })
    }
})

module.exports = router;