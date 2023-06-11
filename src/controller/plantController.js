import {
    getPlantModel,
    getByIdPlantModel,
    postPlantModel
} from "../models/plantModel.js"
import { nanoid } from "nanoid"

// Get data
const getPlant = async (req, res) => {
    try {
        const [data] = await getPlantModel()
        res.json({
            code: 200,
            status: 'OK',
            message: 'Berhasil mengambil data tanaman',
            data: data.map(item => ({ plant_id: item.plant_id, ...item }))
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

// Get byId
const getByIdPlant = async (req, res) => {
    const { plant_id } = req.params
    try {
        const [data] = await getByIdPlantModel(plant_id)
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data tanaman tidak ditemukan',
                data: null,
            });
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Berhasil mengambil data tanaman',
                data: { plant_id: data[0].plant_id, ...data[0] },
            });
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

// POST
const postPlant = async (req, res) => {
    const { body } = req
    const plant_id = nanoid(16);
    try {
        const [data] = await postPlantModel(body, plant_id)
        res.json({
            code: 200,
            status: "OK",
            message: 'Berhasil menambahkan data tanaman',
            data: { plant_id, ...req.body },
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
    getPlant,
    getByIdPlant,
    postPlant
}
