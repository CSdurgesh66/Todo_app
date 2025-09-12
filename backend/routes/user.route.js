const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;


// sign up 
router.post("/signup", async (req, res) => {
    try {

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            newUser
        })

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({
            success: false,
            messsage: "Error signup user"
        })
    }

})

// login
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: "user login successfull",
            token,
            data: {
                id: user._id,
                name: user.username,
                email: user.email
            }
        });


    } catch (err) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            messsage: "Error login user"
        })
    }
})


module.exports = router;
