import jsonwebtoken from "jsonwebtoken"
import response from "../utils/response.js";
const secret = process.env.JWT_SECRET;

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response(401, "Unauthorized", "Access token not found", res);
  }

  jsonwebtoken.verify(token, secret, (err, user) => {
    if (err) {
      return response(403, "Error", "Invalid token", res);
    }
    req.user = user;
    next();
  });
};

export default authentication