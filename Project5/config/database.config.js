const mongoose = require('mongoose');


module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Connected to database successfully");
    } catch (err) {
        console.error("Failed to connect to database", err);
    }
}
