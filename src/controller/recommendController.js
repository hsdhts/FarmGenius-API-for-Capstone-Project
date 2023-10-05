import {
    getRecommendModel, postRecommendModel, getByIdRecommendModel
} from "../models/recommendModel.js"
import { nanoid } from "nanoid"

//GET RecommendPlant Data
const getRecommend = async (req, res) => {
    try {
        const [data] = await getRecommendModel()
        res.json({
            code: 200,
            status: 'OK',
            message: 'Berhasil mengambil data rekomendasi tanaman',
            data: data,
        }) 
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        })
    }
}

//GET RecommendPlant Data By Id
const getByIdRecommend = async (req, res) => {
    const { recommendation_id } = req.params;
    try {
        const [data] = await getByIdRecommendModel(recommendation_id);
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Rekomendasi tidak ditemukan',
                data: null,
            });
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Berhasil mengambil data rekomendasi',
                data: data,
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        });
    }
}

// POST RecommendPlant Data 
const postRecommend = async (req, res) => {
    const { body } = req
    const recommendation_id = nanoid(16);
    try {
        const [data] = await postRecommendModel(body, recommendation_id) 
        res.json({
            code: 200,
            status: "OK",
            message: 'Berhasil menambahkan rekomendasi tanaman',
            data: req.body,
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: req.body,
        })
    }
}

export {
    getRecommend,
    postRecommend, getByIdRecommend
}