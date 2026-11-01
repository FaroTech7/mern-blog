import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already registered'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            }
        })

    } catch (error) {
        console.error('Registration error:', error)

        return res.status(500).json({
            message: 'Registration failed'
        })
    }
}


// Login an existing user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password'
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })

    } catch (error) {
        console.error('Login error:', error)

        return res.status(500).json({
            message: 'Login failed'
        })
    }
}