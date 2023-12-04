import express from 'express'
import { registerValidate } from '../validation/registerSchema.js'
import { validate } from '../middleware/validate.js'
import { loginValidate } from '../validation/loginSchema.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import {
    registration, login
} from '../controller/authController.js'

dotenv.config()

const router = express.Router()

// Authentication
router.post('/login', validate(loginValidate), login)

// Registration
router.post('/register', validate(registerValidate), registration)

// Refreshtoken
router.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token tidak ditemukan' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Gagal untuk autentikasi refresh token' });
        }

        const user = { id: decoded.user_id, email: decoded.email };
        console.log(user)
        const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({ accessToken });
    });
});

export default router 