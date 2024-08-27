


const registerUser = async (req, res) => {
    try {
        
        const { fullname, username, password, confirmPassword, gender } = req.body;

        

    } catch (error) {
        
    }
}

const loginUser = (req, res) => {
    res.send("login user")
}

const logoutUser = (req, res) => {
    res.send("logout user")
}

export {
    registerUser,
    loginUser,
    logoutUser
}