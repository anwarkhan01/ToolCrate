import { urlShortner } from "../models/urlShortner.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"



function generateCode() {
    let codeLength = 10
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < codeLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const convertURL = asyncHandler(async (req, res) => {
    let { originalURL } = req?.body;
    // console.log(req?.body)
    if (!originalURL || !originalURL.trim()) {
        throw new ApiError(400, "URL is required");
    }

    originalURL = originalURL.trim();

    const existedURL = await urlShortner.findOne({ originalURL });
    if (existedURL) {
        const customURL = `${process.env.BACKEND_URL}/${existedURL.shortCode}`;
        return res.status(200).json(new ApiResponse(200, customURL));
    }

    const shortCode = generateCode();

    const newEntry = await urlShortner.create({ originalURL, shortCode });
    const customURL = `${process.env.BACKEND_URL}/${newEntry.shortCode}`;

    res.status(200).json(new ApiResponse(200, customURL));
});

const reDirectURL = asyncHandler(async (req, res) => {
    const { shortId: shortCode } = req.params;

    if (!shortCode) {
        throw new ApiError(400, "Short URL code is required");
    }

    const record = await urlShortner.findOne({ shortCode });

    if (!record) {
        throw new ApiError(404, "No matching URL found");
    }

    res.redirect(record.originalURL);
});

export { convertURL, reDirectURL }



