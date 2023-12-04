import dbPool from "../config/connection.js"


// GET All PlantModel 
const getPlantModel = () => {
    const SQLQuery = "SELECT * FROM plant"

    return dbPool.execute(SQLQuery)
}

// GET PlantModel Data By Id
const getByIdPlantModel = (plant_id) => {
    const SQLQuery = "SELECT * From plant WHERE plant_id=?";
    const values = [plant_id];

    return dbPool.execute(SQLQuery, values)
}

// POST PlantModel Data
const postPlantModel = (body, plant_id) => { 
    const SQLQuery = "INSERT INTO plant (plant_id, name, `desc_plant`) VALUES (?, ?, ?)";
    const values = [plant_id, body.name, body.desc_plant]; 

    console.log(SQLQuery)
    return dbPool.execute(SQLQuery, values)
}

export {
    getPlantModel,
    getByIdPlantModel,
    postPlantModel,
}