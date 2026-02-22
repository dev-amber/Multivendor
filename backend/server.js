const app = require("./app"); // import
const connectDatabase = require("./db/Database");
const express=require("express")
const cloudinary = require("cloudinary");


// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server for handling uncaught exception");
    process.exit(1); // exit immediately (optional but recommended)
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: __dirname + "/config/.env" });
}

// connect database
connectDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Create server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server for unhandled promise rejection");
    // shutown server safley
    server.close(() => {
        process.exit(1);
    }); //0 means success // 1 means failure wutherror
});
