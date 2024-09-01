import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./userContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            // Initialize socket connection
            const newSocket = io("http://localhost:5000", {
                query: {
                    userId: user._id
                }
            });
    
            setSocket(newSocket);
    
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })
    
            // Cleanup function to close the socket when component unmounts or user changes
            return () => {
                newSocket.close();
                setSocket(null);
            };
        } else {
            // Close socket if user is null and socket is open
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]); // Add user as a dependency
    

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
