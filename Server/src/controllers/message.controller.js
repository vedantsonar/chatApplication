import { Chat } from "../models/chat.models.js";
import { Message } from "../models/message.models.js";

const sendMessage = async (req, res) => {
  let success = false;

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

    const newMsg = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    if (newMsg) {
      chat.messages.push(newMsg._id);
    }

    // Socket.io

    await Promise.all([chat.save(), newMsg.save()]); // both save methods run simultaneously

    success = true;
    res.status(201).json({ success, newMsg });
  } catch (error) {
    return res
      .status(500)
      .json({
        success,
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
