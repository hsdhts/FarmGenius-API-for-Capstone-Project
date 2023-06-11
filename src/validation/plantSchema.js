import Joi from "joi"

// rules validasi
const plantValidate = Joi.object({
    name: Joi.string()
        .min(3)
        .max(255)
        .required(),
    desc_plant: Joi.string()
        .min(5)
        .required(),
}).options({ abortEarly: false })

export { plantValidate }