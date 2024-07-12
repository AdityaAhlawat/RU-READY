import mongoose from "mongoose"

const connetMongoDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
        }
        const uri = process.env.MONGODB_URI
        mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error)
    }
}

export default connetMongoDB;