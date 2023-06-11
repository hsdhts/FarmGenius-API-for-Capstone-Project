import dbPool from "../config/connection.js"


// GET DATA
const getPlantModel = () => {
    const SQLQuery = "SELECT * FROM plant"

    return dbPool.execute(SQLQuery)
}

// get Data by id
const getByIdPlantModel = (plant_id) => {
    const SQLQuery = "SELECT * From plant WHERE plant_id=?";
    const values = [plant_id];

    return dbPool.execute(SQLQuery, values)
}

// post Data
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