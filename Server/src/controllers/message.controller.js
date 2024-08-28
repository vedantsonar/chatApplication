import { Chat } from "../models/chat.models.js"
import { Message } from "../models/message.models.js"

const sendMessage = async (req, res) => {
    
    try {
        const { receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        let chat = await Chat.findOne({
            participants: { $all : [senderId, receiverId]} 
        })

        if(!chat){
            chat = await chat.create({
                participants: [senderId, receiverId]
            })
        }

        // FIXME: message not store in database
        const newMsg = new Message({
            senderId,
            receiverId,
            message
        })
        
        if(newMsg){
            chat.messages.push(newMsg._id)
        }

        res.status(201).json(newMsg)

    } catch (error) {
        return res.status(500).json({success, message: "Error in send message controller" , error: error.message})
    }
}

export { sendMessage }