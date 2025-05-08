import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`)
        console.log(response.connection.host)
    } catch (error) {
        console.log("error occured while connecting to database", error)
    }
}

export { connectDB }