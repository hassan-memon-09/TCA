import JWT from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
    if (!token.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Invalid token format",
      });
    }
    const decoded = JWT.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).send({
      success: false,
      message: `Unauthorized: ${error.message}`,
    });
  }
};
