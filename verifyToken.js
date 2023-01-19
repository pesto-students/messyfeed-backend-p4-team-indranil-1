import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token || req?.headers?.authorization;
  if (!token) {
    res.status(403).json({ Auth: false, message: "No token provided!" });
    return;
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ Auth: false, message: "Unauthorized!" });
      return;
    } else {
      req.user = decoded;
      next();
    }
  });
};
