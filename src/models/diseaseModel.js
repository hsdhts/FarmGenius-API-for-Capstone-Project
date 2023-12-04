import dbPool from "../config/connection.js"

// GET Disease Model
const getDiseaseModel = () => {
    const SQLQuery = "SELECT * FROM disease"

    return dbPool.execute(SQLQuery)
}

// GET Disease Model By Id
const getByIdDiseaseModel = (disease_id) => {
    const SQLQuery = "SELECT * FROM disease WHERE disease_id=?";
    const values = [disease_id];

    return dbPool.execute(SQLQuery, values)
}

// POST Data Model By Id
const postDiseaseModel = (body, disease_id) => {
    const SQLQuery = "INSERT INTO disease (disease_id, name, `desc`, solution) VALUES (?, ?, ?, ?)";
    const values = [disease_id, body.name, body.desc, body.solution];

    console.log(SQLQuery)
    return dbPool.execute(SQLQuery, values)
}

export {
    getDiseaseModel,
    getByIdDiseaseModel,
    postDiseaseModel,
}