const mongoose = require("mongoose");


const dbConnect = async() => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected successfully")
    })
    .catch((error) => {
        console.log(error);
        error
    })
}

module.exports = dbConnect;