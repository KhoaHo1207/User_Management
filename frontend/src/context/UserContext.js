import React from "react";
import { useNavigate } from "react-router-dom";

// @function  UserContext
const UserContext = React.createContext({ name: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: "", auth: false });
  // const navigate = useNavigate();
  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    // navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

//useContext tự động rerender
