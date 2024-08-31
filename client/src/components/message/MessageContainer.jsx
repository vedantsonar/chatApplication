import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import useConversation from "../../zustand/useConversation.js";
import { useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext.js";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-300 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullname}
            </span>
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
  const { user, loading } = useContext(UserContext);

  if (loading) {
    <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user?.fullname} </p> {/* ❄ */}
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};
