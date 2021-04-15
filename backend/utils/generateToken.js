import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (id) => {
  return jwt.sign({ id },"secret", { expiresIn: "15d" });
};
export default generateToken;
