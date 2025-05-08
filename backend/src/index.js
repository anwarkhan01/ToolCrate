import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"
import app from "./app.js"
dotenv.config({
    path: "./.env"
})

connectDB().then(() => {
    app.listen(process.env.PORT || 8080, (req, res) => {
        console.log("server is listening on port", process.env.PORT)
    })
})
    .catch((error) => {
        console.log("some error occured while connecting to db", error)
    })