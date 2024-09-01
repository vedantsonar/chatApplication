import { Chat } from "../models/chat.models.js";
import { Message } from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {

  try {
    const { receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user.id;

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }

    await Promise.all([chat.save(), newMessage.save()]); // both save methods run simultaneously

    // Socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json({newMessage});
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error in send message controller",
        error: error.message,
      });
  }
};

const getMessage = async (req, res) => {
	try {
		const { userToChatId } = req.params;
		const senderId = req.user.id;

		const conversation = await Chat.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); 

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export { sendMessage, getMessage };
