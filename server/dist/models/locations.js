import mongoose from "mongoose";
import { trim } from "zod";
const locationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        trim: true
    },
    lat: {
        type: String,
        required: true,
        trim: true
    },
    lon: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
const Location = mongoose.model("Location", locationSchema);
export default Location;
//# sourceMappingURL=locations.js.map