// import {
//     getDiseaseModel, getByIdDiseaseModel,
//     postDiseaseModel
// } from "../models/diseaseModel.js"
// import { nanoid } from "nanoid"

// // get data
// const getDisease = async (req, res) => {
//     try {
//         const [data] = await getDiseaseModel()
//         res.json({
//             code: 200,
//             status: 'OK',
//             message: 'Sukses mengambil data penyakit',
//             data: data,
//         })
//     } catch (error) {
//         res.status(500).json({
//             code: 500,
//             status: 'INTERNAL SERVER ERROR',
//             message: error,
//             data: null,
//         })
//     }
// }

// // get by id
// const getByIdDisease = async (req, res) => {
//     const { disease_id } = req.params
//     try {
//         const [data] = await getByIdDiseaseModel(disease_id)
//         if (data.length === 0) {
//             res.status(404).json({
//                 code: 404,
//                 status: 'NOT FOUND',
//                 message: 'Data penyakit tidak ditemukan',
//                 data: null,
//             });
//         } else {
//             res.json({
//                 code: 200,
//                 status: 'OK',
//                 message: 'Berhasil mengambil data penyakit',
//                 data: data,
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             code: 500,
//             status: 'INTERNAL SERVER ERROR',
//             message: error,
//             data: null,
//         })
//     }
// }

// // post
// const postDisease = async (req, res) => {
//     const { body } = req
//     const disease_id = nanoid(16);
//     try {
//         const [data] = await postDiseaseModel(body, disease_id)
//         res.json({
//             code: 200,
//             status: "OK",
//             message: 'Data penyakit berhasil ditambahkan',
//             data: req.body,
//         })
//     } catch (error) {
//         res.status(500).json({
//             code: 500,
//             status: 'INTERNAL SERVER ERROR',
//             message: error,
//             data: req.body,
//         })
//     }
// }

// export {
//     getDisease,
//     getByIdDisease,
//     postDisease
// }

import {
    getDiseaseModel, getByIdDiseaseModel,
    postDiseaseModel
} from "../models/diseaseModel.js"
import { nanoid } from "nanoid"

// get data
const getDisease = async (req, res) => {
    try {
        const [data] = await getDiseaseModel()
        res.json({
            code: 200,
            status: 'OK',
            message: 'Sukses mengambil data penyakit',
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

// get by id
const getByIdDisease = async (req, res) => {
    const { disease_id } = req.params
    try {
        const [data] = await getByIdDiseaseModel(disease_id)
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data penyakit tidak ditemukan',
                data: null,
            });
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Berhasil mengambil data penyakit',
                data: {
                    disease_id: data[0].disease_id, // Sertakan disease_id dalam respons
                    ...data[0]
                },
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

// post
const postDisease = async (req, res) => {
    const { body } = req
    const disease_id = nanoid(16);
    try {
        const [data] = await postDiseaseModel(body, disease_id)
        res.json({
            code: 200,
            status: "OK",
            message: 'Data penyakit berhasil ditambahkan',
            data: {
                disease_id: disease_id, // Sertakan disease_id dalam respons
                ...req.body
            },
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
    getDisease,
    getByIdDisease,
    postDisease
}
