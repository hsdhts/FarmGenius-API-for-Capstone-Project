import express from 'express';
import { recommendValidate } from '../validation/recommendSchema.js';
import { validate } from '../middleware/validate.js';
import auth from '../middleware/authentication.js';

// Memanggil controller recommend
import {
  getRecommend,
  postRecommend, getByIdRecommend
} from '../controller/recommendController.js';

const router = express.Router();

// GET All Data recommendFarm
router.get('/recommend_farm', auth, getRecommend)

// GET Data recommendFarm By Id
router.get('/recommend_farm/:recommendation_id', auth, getByIdRecommend);


//POST Data recommendFarm By Id
router.post('/recommend_farm', auth, validate(recommendValidate), postRecommend);

export default router;
