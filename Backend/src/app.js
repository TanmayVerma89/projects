import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import passport from "passport";
import "./config/passport.js"

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize())
app.use('/api/auth',authRouter)

app.get('/health',(req,res) => {
    return res.status(200).json({
        message: `Health ok`,
    });
})

export default app