import jwt from 'jsonwebtoken'
import config from '../config/config'


interface useR {
    id: string;
    username: string;
  }

function generateJwtToken(user : useR) {
  try {
    return jwt.sign(
      { id: user.id.toString() , username: user.username },
      config.JWT_SECRET_KEY as string,
      { expiresIn: "7d" },
    );
  } catch (error) {
    console.error("JWT token üretim hatası:", error);
    throw error;
  }
}

export default generateJwtToken;