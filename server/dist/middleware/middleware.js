import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const middleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(404).json({
                message: "Token is missing, invalid credentials",
                success: false
            });
        }
        if (!process.env.JWT_SECRET) {
            return res.status(403).json({
                message: "invalid secret key",
                success: false
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        //@ts-ignore
        req.user = decode;
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error while validating token",
            error: error instanceof Error ? error.message : error
        });
    }
};
//# sourceMappingURL=middleware.js.map