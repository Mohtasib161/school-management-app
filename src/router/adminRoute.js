import express from "express";
import * as adminController from "../controller/adminController.js"
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/login", adminController.login)

 // Protect a route by applying the authenticate middleware

 router.get('/protected-route', authenticate, (req, res) => {
    res.status(200).json({
        message: "Access granted  to protect route",
        user: req.admin,
    })
 })
export default router;