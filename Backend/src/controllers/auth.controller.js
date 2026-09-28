import redis from "../config/redis.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from '../config/config.js';

export function sendTokenResponse(user, res, message) {
    const token = jwt.sign(
        {
            userId: user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );
    //
    res.cookie("token", token);
    // Send response with success message and new user data
    return res.status(201).json({
        message: message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            pfp: user.pfp,
        },
    });
}

export async function registerController(req, res) {
    const { fullname, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(401).json({
            message: `User already exists`,
            success: false,
        });
    }

    const user = await userModel.create({
        fullname,
        email,
        password,

    });

    return sendTokenResponse(user, res, "User register successfully");
}

export async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({
            success: false,
            message: `Invalid user credentials`,
        });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: `Invalid user credentials`,
        });
    }

    return sendTokenResponse(user, res, "User login successfully");
}

export async function logoutController(req, res) {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: `No token found`,
        });
    }

    await redis.set(token, "revoked", { EX: 60 * 60 * 24 });

    res.clearCookie("Token");

    return res.status(200).json({
        success: true,
        message: `user logged out successfully`,
    });
}

export async function googleController(req, res) {
    const profile = req.user
    try {
        // find by email or create new user if not exists

        let user = await userModel.findOne({ email: profile.emails[0].value })

        if (!user) {
            // If user does not exist, create a new one
            user = await userModel.create({
                email: profile.emails[0].value,
                googleId: profile.id,
                fullname: profile.displayName,
                pfp: profile.photos && profile.photos.length > 0
                    ? profile.photos[0].value
                    : undefined,
            });
        }
        console.log("User saved : ",user)

        sendTokenResponse(user, res, "user logged in successfully")

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error in Google Register`, error: err
        })
    }
}