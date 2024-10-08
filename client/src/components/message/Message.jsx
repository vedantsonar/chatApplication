import { UserContext } from "../../context/userContext.js"
import useConversation from "../../zustand/useConversation.js"
import { extractTime } from "../../utils/extractTime.js";
import { useContext } from "react";

const Message = ({message}) => {

    const { user } = useContext(UserContext); 
	const { selectedConversation } = useConversation();

	const fromMe = message.sender === user._id;
	// console.log("m", message.sender)
	// console.log("u", user._id)
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? user.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";  //bg-gray-700 

    return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
}

export default Message