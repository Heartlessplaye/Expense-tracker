import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(); 

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect (() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser) {
      setUser(JSON.parse(storedUser)); // parse the stringified user object   
    }
  },[]);

   // empty dependency array to run only once on mount

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user)); // store user in local storage
  };

  // clearUser 
  const clearUser = () => {
    setUser(null);
    localStorage.clear(); // remove user from local storage
  };
  
  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserProvider;
