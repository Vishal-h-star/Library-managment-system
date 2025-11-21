const mongoose = require('mongoose')

// First way to make connection 

// function Dbconnection() {
//     const DB_URL = process.env.MONGO_URI
//     mongoose.connect(DB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     const db = mongoose.connection;
//     db.on("error", console.error.bind(console, " Hey connection Error 😒"))
//     db.once("open", function () {
//         console.log("DB is connected...")
//     })
// }


// second Mordern and  async-await (latest method)

const Dbconnection = async () => {
    try {
        const DB_URL = process.env.MONGO_URI
        const connect = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log(`🔥 MongoDB Connected: ${connect.connection.host}`);
      
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
}

module.exports = Dbconnection;