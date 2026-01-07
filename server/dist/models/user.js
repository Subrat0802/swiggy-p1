import mongoose, { Schema } from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";
const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    token: {
        type: String,
    },
    currentLocation: {
        location: {
            type: String,
            default: "",
        },
        lat: {
            type: String,
            default: "",
        },
        lon: {
            type: String,
            default: "",
        },
    },
}, {
    timestamps: true,
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.js.map