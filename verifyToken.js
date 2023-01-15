import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(403).send({ message: "No token provided!" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized!" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
