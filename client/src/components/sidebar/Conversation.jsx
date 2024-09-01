import { useSocketContext } from "../../context/socketContext.js";
import useConversation from "../../zustand/useConversation.js";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext()

  const isOnline = onlineUsers.includes(conversation._id)

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-gray-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-gray-400" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic}
              alt="user avatar"
              style={{ backgroundColor: "whitesmoke" }}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 ms-3">
              {conversation.fullname}
            </p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-1 py-0 h-[1px] bg-slate-400" />}
    </>
  );
};
export default Conversation;
