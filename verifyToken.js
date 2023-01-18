import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token || req?.headers?.authorization;
  console.log(
    "Token..",
    token,
    "Authorization .....",
    req.headers.authorization
  );
  if (!token) {
   // res.status(403).send({ message: "No token provided!" });
 // } else {
   // jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
   //   if (err) {
    //    res.status(401).send({ message: "Unauthorized!" });
    //  } else {
     //   req.user = decoded;
     //   next();
    //  }
   // });
  //}
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
