import { Router } from "express";
import { googleController, loginController, logoutController, registerController } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";
const authRouter = Router();

authRouter.post("/register", registerValidator, registerController);
authRouter.post("/login", loginValidator, loginController);
authRouter.post("/logout", authMiddleware, logoutController);

//Google Authenticatoion routes
authRouter.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false }),
);

authRouter.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/",
    }),
    googleController
);

export default authRouter;
