import { Chat } from "../models/chat.models.js"
import { Message } from "../models/message.models.js"

const sendMessage = async (req, res) => {
    let success = false
    
    try {
        const { receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        let chat = await Chat.findOne({
            participants: { $all : [senderId, receiverId]} 
        })

        if(!chat){
            chat = await Chat.create({
                participants: [senderId, receiverId]
            })
        }

        const newMsg = new Message({
            sender: senderId,  
            receiver: receiverId,  
            message
        })
        
        if(newMsg){
            chat.messages.push(newMsg._id)
        }

        await chat.save()
        await newMsg.save()

        res.status(201).json({success, newMsg})

    } catch (error) {
        return res.status(500).json({success, message: "Error in send message controller" , error: error.message})
    }
}

export { sendMessage }