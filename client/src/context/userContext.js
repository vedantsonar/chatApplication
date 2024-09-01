import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/getCurrentUser`,
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (response.status !== 200 || data.error) {
        throw new Error(data.error || "Failed to fetch user");
      }

      setUser(data.user);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
