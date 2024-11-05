import * as adminService from '../services/adminService.js';



export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const result =  await adminService.loginAdmin(email, password);
        res.status(200).json(result);
    } catch (error){
        console.error("Login error:", error);
        res.status(401).json({success: false, message: error.message})
    }
} 