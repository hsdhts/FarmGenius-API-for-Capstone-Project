import { registrationAuthModel, checkEmailRegistered, loginAuthModel } from '../models/authModel.js'
import bcrypt from 'bcrypt';
import { nanoid } from "nanoid"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// registrasi
const registration = async (req, res) => {
    const { body } = req
    const user_id = nanoid(16);
    const dates = new Date();
    try {
        // Cek ketika email sudah digunakan
        const isEmailRegistered = await checkEmailRegistered(body.email);
        if (isEmailRegistered) {
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Email sudah digunakan',
                data: null,
            });
        }

        // encrypt password
        const hashedPassword = await hashPassword(body.password);
        const [data] = await registrationAuthModel(body, user_id, dates, hashedPassword)
        
        const responseData = { ...body };
        delete responseData.password;

        res.json({
            code: 200,
            status: "OK",
            message: 'Registrasi berhasil',
            data: responseData,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        })
    }
}

//password hashing
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};


// login
const login = async (req, res) => {
    const { body } = req;
    try {
        const [user] = await loginAuthModel(body);
        // Check if email exists
        if (user.length === 0) {
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Email tidak sesuai',
                data: null,
            });
        }

        const isMatch = await bcrypt.compare(body.password, user[0].password);
        if (!isMatch) {
            // cek ketika password salah
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Password salah',
                data: null,
            });
        } else {
            // generate token
            const loguser = { id: user[0].user_id, email: user[0].email };
            const accessToken = jwt.sign(loguser, process.env.SECRET_KEY, { expiresIn: '1h' });
            const refreshToken = jwt.sign(loguser, process.env.REFRESH_TOKEN_KEY);
            
            const responseData = {
                code: 200,
                status: "OK",
                user_id: user[0].user_id,
                name: user[0].name,
                email: user[0].email,
                message: 'Login berhasil',
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            
            res.json(responseData);
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        })
    }
}

export {
    registration,
    login
}
