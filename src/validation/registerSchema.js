import Joi from "joi"

// Rules validasi
const registerValidate = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .regex(/^(?=.*[A-Z])[a-zA-Z0-9]{8,30}$/)
        .message('Password harus berisi (minimal 1) huruf besar dan angka saja, dan panjangnya minimal 8 karakter')
}).options({ abortEarly: false })

export { registerValidate }