import { User } from "../models/user.models.js";

const getUserForSidebar = async (req, res) => {
    let success = false
    try {
        
        const loggedInUser = req.user._id

        const filteredUsers = await User.find({ _id: {$ne: loggedInUser} }).select("-password")

        success = true
        res.status(200).json({success, filteredUsers})

    } catch (error) {
        return res.status(500).json({ success, message: "Error in contacts controller", error: error.message });
    }
}

export { getUserForSidebar }