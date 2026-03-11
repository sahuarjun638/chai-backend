// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";


dotenv.config()

connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at: ${process.env.PORT} `);
    })
})
.catch( (err) => {
    console.log("Monogdb connection failed!!", err)
})




/*
import express from "express";

const app = express();

( async() => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error", (error) => {
        console.log("error", error);
        throw error
       })// this is listener and it is part of express

       app.listen(process.env.port, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
        
       })

    } catch (error) {
        console.log("error", error)
        throw err
    }
})()
*/