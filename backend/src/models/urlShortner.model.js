import mongoose, { Schema } from "mongoose";

const urlShortnerSchema = new Schema({
    originalURL: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true })


export const urlShortner = mongoose.model("urlShortner", urlShortnerSchema)
