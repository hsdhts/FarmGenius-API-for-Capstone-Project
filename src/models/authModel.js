import dbPool from '../config/connection.js';

// Check jika email sudah terdaftar
const checkEmailRegistered = async (email) => {
  const SQLQuery = 'SELECT * FROM user WHERE email = ?';
  const [rows] = await dbPool.execute(SQLQuery, [email]);
  return rows.length > 0;
};

// Register User Model
const registrationAuthModel = (body, user_id, dates, hashedPassword) => {
  const SQLQuery = "INSERT INTO user (user_id, name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [user_id, body.name, body.email, hashedPassword, dates, dates];

  return dbPool.execute(SQLQuery, values);
};

// Login User Model
const loginAuthModel = (body) => {
  const SQLQuery = "SELECT * FROM user WHERE email=?";
  const values = [body.email];

  return dbPool.execute(SQLQuery, values);
};

export {
  registrationAuthModel,
  checkEmailRegistered,
  loginAuthModel,
};
