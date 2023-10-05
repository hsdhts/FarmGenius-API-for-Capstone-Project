import dbPool from "../config/connection.js";
import { nanoid } from "nanoid";

// GET All Data RecommendModel
const getRecommendModel = () => {
  const SQLQuery = "SELECT * FROM recommendation_farm";

  return dbPool.query(SQLQuery);
};

//GET RecommendModel Data By Id
const getByIdRecommendModel = (recommendation_id) => {
    const SQLQuery = "SELECT * FROM recommendation_farm WHERE recommendation_id=?"
    const values = [recommendation_id]

    return dbPool.execute(SQLQuery, values);
}

// POST RecommendModel Data
const postRecommendModel = (body) => {
  const recommendation_id = nanoid(16);
  const SQLQuery =
    "INSERT INTO recommendation_farm (recommendation_id, daerah, suhu, luas_tanah, recommendasi_tanaman) VALUES (?, ?, ?, ?, ?)";

  const values = [
    recommendation_id,
    body.daerah,
    body.suhu,
    body.luas_tanah,
    body.recommendasi_tanaman
  ];

  return dbPool.execute(SQLQuery, values);
};

export { getRecommendModel, getByIdRecommendModel,postRecommendModel };
