import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateAuthToken.utils.js";


const registerUser = async (req, res) => {
    let success = false;
    try {
        
        const { fullname, username, password, confirmPassword } = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({ success, message: "Passwords do not match. Please ensure both passwords are identical."})
        }

        const existedUser = await User.findOne({username})

        if(existedUser){
            return res.status(400).json({ success, message: "This user already exists. Please try logging in or use a different username address."})
        }

        const profilePicLocalPath = req.files?.profilePic?.[0]?.path;
        if(!profilePicLocalPath){
            return res.status(400).json({ success, message: "Profile pic is required"})
        }

        const profilePic = await uploadOnCloudinary(profilePicLocalPath)

        if(!profilePic){
            return res.status(400).json({ success, message: "Failed to upload profile pic" });
        }

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullname,
            username,
            password: encryptedPassword,
            profilePic: profilePic.url 
        });

        // jwt Token
        generateTokenAndSetCookie(user._id, res)

        success = true;
        return res.json({ success, user });

    } catch (error) {
        return res.status(500).json({success, message: "Error in Register User" , error: error.message})
    }
}

const loginUser = async (req, res) => {
    let success = false

    try {
        const { username, password } = req.body;

        const user = await User.findOne({username})

        const passwordCompare = await bcrypt.compare(password, user?.password || "")
        if (!user || !passwordCompare) {
            return res.status(400).json({ success, error: "Incorrect username or password" });
        }

        // authtoken
        generateTokenAndSetCookie(user._id, res)

        success = true

        return res.status(200).json({success, user})

    } catch (error) {
        return res.status(500).json({success, message: "Error in Login User" , error: error.message})
    }
}

const logoutUser =  (req, res) => {
    let success = false
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        success = true
        res.status(200).json({success, message: "User logout Successfully"})
    } catch (error) {
        return res.status(500).json({success, message: "Error in Logout User" , error: error.message})
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}

// TODO: Update User Information 