import express from "express"
import cors from "cors"
import urlshortnerRoute from "./routes/urlShortner.route.js"
import ApiError from "./utils/ApiError.js"

const app = express()
app.use(cors({
    origin: "*",
    // credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/url-convert", urlshortnerRoute)
app.use("/", urlshortnerRoute)

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        console.log("Custom API Error:", err.statusCode);
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            errors: err.errors || [],
            success: err.success || false,
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Something went wrong",
        success: false,
    });
});

export default app