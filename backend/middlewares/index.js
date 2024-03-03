import jwt from "jsonwebtoken";

const userAuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email) {
      req.email = decoded.email;
      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "User isn't logged in" });
    }
  } catch (error) {
    console.error("Error in userMiddleware:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default userAuthMiddleware;
