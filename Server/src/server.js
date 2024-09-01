import dotenv from "dotenv";
import connectDB from "./db/connectDatabase.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

// routes import
import userRouter from "./routes/user.route.js";
import msgRouter from "./routes/message.route.js"
import contactsRouter from "./routes/contacts.route.js";

// route declaration
app.use("/api/users", userRouter)
app.use("/api/msg", msgRouter)
app.use("/api/contacts", contactsRouter)

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!", err)
})