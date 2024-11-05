import { query } from "../db.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config()
 const JWT_SECRET = process.env.JWT_SECRET;

const updatePassword = async () => {
    try {
        // Hash the plaintext password
        const hashedPassword = await bcrypt.hash("Lahore@007", 10);

        // Update the password in the database
        await query("UPDATE admin SET password = $1 WHERE email = $2", [hashedPassword, "admin007@gmail.com"]);
        console.log("Password has been hashed and updated in the database.");
    } catch (error) {
        console.error("Error updating password:", error);
    }
};

updatePassword();

export const loginAdmin = async (email, password,) => {
    try {

    
    const {rows} = await query("SELECT * FROM admin WHERE email = $1", [email]);
    const admin = rows[0];
    
    if(!admin) {
        throw new Error("User not found")
    }

    console.log("Fetched user:", admin);
   // const hashedPassword = await bcrypt.hash("Lahore@007", 10);
   const isMatch = await bcrypt.compare(password, admin.password);

   console.log("Password match:", isMatch);  // Log if passwords match

   if (!isMatch) throw new Error("Invalid credentials");

   // payload
   const payload = {
    id:admin.id,
    email:admin.email
   }

   const token = jwt.sign(payload,JWT_SECRET,{expiresIn: "1h"} );

   return  {
    success : true,
    message: "Login successful",
    admin: { id: admin.id, username: admin.username, email: admin.email },
    token: token
   };

  // return { success: true, message: "Login successful", admin: { id: admin.id, username: admin.username , email:admin.email } };
} catch (error) {
   console.error("Error in loginUser:", error);
   throw error;
}

    

};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token verified:", decoded);
        return {
            success: true,
            message: "Token is valid",
            data: decoded
        };
    } catch (error) {
        console.error("Token verification failed:", error);
        return {
            success: false,
            message: "Invalid or expired token",
            error: error.message
        };
    }
};