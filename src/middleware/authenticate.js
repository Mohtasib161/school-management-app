import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";

dotenv.config();

const app = express();
app.use(cookieParser()); // Parse cookies in requests

const JWT_SECRET = process.env.JWT_SECRET;

// Authentication Middleware
export const authenticate = (req, res, next) => {
    // Extract token from cookies
    const token = req.cookies.token;
    console.log("Token from cookie:", token);

    // If no token is found, return an error response
    if (!token) {
        return res.status(401).json({ message: "Authentication token missing" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded; // Attach decoded payload to `req.admin`
        console.log("Token successfully verified:", decoded);

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Handle JWT verification errors
        console.error("JWT verification failed:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
