import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.scss";
import Header from "./components/Header";

import { Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";
function App() {
  const { user, loginContext } = useContext(UserContext);
  const dataUserRedux = useSelector((state) => state.users.account);
  console.log("datauserredux", dataUserRedux);
  console.log(user);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
    console.log(localStorage.getItem("token"));
  }, []);
  return (
    <div className="app-container">
      <Header />
      <Container>
        <AppRoutes />
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
