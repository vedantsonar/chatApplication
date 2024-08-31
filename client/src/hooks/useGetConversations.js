import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/api/contacts/", {
                    method: "GET",
                    headers: {"auth-token": localStorage.getItem("token")}
                });
        
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
        
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data.filteredUsers);
                
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;




// const res = await fetch("http://localhost:5000/api/contacts/", {
//     method: "GET",
//     headers: {"auth-token": localStorage.getItem("token")}
    
// });