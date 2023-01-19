import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req?.headers?.authorization;
  // console.log(
  //   "Token..",
  //   token,
  //   "Authorization .....",
  //   req.headers.authorization
  // );
  if (!token) {
    res.status(403).json({ Auth: false, message: "No token provided!" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ Auth: false, message: "Unauthorized!" });
    } else {
      req.user = decoded;
      next();
    }
  });
};
