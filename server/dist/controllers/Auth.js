import { signUpvalidation } from "../utils/zodvalidation.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = await signUpvalidation.parseAsync(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });
        if (!response) {
            return res.status(400).json({
                message: "Error while creating user, try again.",
                success: false
            });
        }
        return res.status(200).json({
            message: "User signup successfully",
            success: true,
            user: response
        });
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                errors: err.issues.map((e) => ({
                    path: e.path.join("."),
                    message: e.message,
                })),
            });
        }
        else {
            return res.status(500).json({
                message: "Server error while user signup",
                success: false
            });
        }
    }
};
//# sourceMappingURL=Auth.js.map