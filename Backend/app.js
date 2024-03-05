import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("dist"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js';
import sportrouter from "./routes/sport.routes.js";
import sessionrouter from "./routes/sessions.routes.js"


//routes declaration
app.use("/api/users", userRouter)
app.use("/api/sports", sportrouter)
app.use("/api/sessions", sessionrouter)


export { app }