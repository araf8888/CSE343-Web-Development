const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://mawada:3AcloApEh4AvLP6B@cluster0.kfgxowi.mongodb.net/CoursesDB?retryWrites=true&w=majority"
        );

        console.log("MongoDB Connected Successfully (Atlas)");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
