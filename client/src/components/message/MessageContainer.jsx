import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";

const MessageContainer = () => {
    const isNoChatSelected = true;
	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{isNoChatSelected ? (
                <NoChatSelected /> 
            ) : (
                <>
				{/* Header */}
				<div className='bg-slate-300 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>Vedant</span>
				</div>

				<Messages />

				<MessageInput />
			</>
            )}
		</div>
	);
};
export default MessageContainer;



const NoChatSelected = () => {

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 Shradha K </p> {/* ❄ */}
				<p>Select a chat to start messaging</p>
			</div>
		</div>
	);
};
