import jwt from "jsonwebtoken";

const generateAuthToken = (userId) => {
    const authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    return authToken;
}

export default generateAuthToken;
