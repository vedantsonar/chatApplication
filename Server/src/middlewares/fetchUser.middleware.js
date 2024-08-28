import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const fetchUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unauthorized - No token provided"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedToken){
            return res.status(401).json({error: "Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decodedToken.userId).select("-password")

        if(!user){
            return res.status(404).json({error: "User Not Found"})
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({success, message: "Error in fetching user" , error: error.message})
    }
}

export { fetchUser }