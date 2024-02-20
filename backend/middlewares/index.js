import jwt from "jsonwebtoken";

const userMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email) {
      req.email = decoded.email;
      next();
    } else {
      return res.status(401).json("User isn't logged in");
    }
  } catch (error) {
    console.error("Error in userMiddleware:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default userMiddleware;
