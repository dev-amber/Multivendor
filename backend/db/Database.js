const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URL).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`) //host will provide the address of server
    })
   
}

module.exports = connectDatabase
