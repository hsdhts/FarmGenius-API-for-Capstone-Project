import express from 'express'
import { plantValidate } from '../validation/plantSchema.js'
import { validate } from '../middleware/validate.js'
import auth from '../middleware/authentication.js'


import {
    getPlant, getByIdPlant,
    postPlant
} from '../controller/plantController.js'

const router = express.Router()


// GET All Data Plants  
router.get('/plants', auth, getPlant)

// GET Plant By Id
router.get('/plants/:plant_id', auth, getByIdPlant)

// POST Data Plant 
router.post('/plants', auth, validate(plantValidate), postPlant)


export default router;