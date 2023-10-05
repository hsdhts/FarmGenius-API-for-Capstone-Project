import express from 'express'
import { diseaseValidate } from '../validation/diseaseSchema.js'
import { validate } from '../middleware/validate.js'
import auth from '../middleware/authentication.js'

// memanggil controller about
import {
    getDisease, getByIdDisease,
    postDisease
} from '../controller/diseaseController.js'

const router = express.Router()


// Endpoint for GET All Disease
router.get('/disease', auth, getDisease)

// Endpoint for GET Disease By Id
router.get('/disease/:disease_id', auth, getByIdDisease)

// Endpoint for POST Disease 
router.post('/disease', auth, validate(diseaseValidate), postDisease)


export default router 