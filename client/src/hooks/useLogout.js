import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {

    const [loading, setLoading] = useState(false);
  
    const logout = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users/logout", {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        console.log(data);
  
        if (data.success) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(`Logout failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, logout };
  };
  
export default useLogout;
