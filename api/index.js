import express from "express"
import mysql from "mysql"
import authRoute from "./router/auth.js"
import postRoute from "./router/property.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'real estate'
})
const app = express()

app.use(cors({origin:"http://localhost:5173", credentials:true})); 
app.use(express.json());
app.use(cookieParser())

app.use("/auth", authRoute)
app.use("/post", postRoute)

app.listen(8800,()=>{
    console.log("Backend is running")
})


export default db;