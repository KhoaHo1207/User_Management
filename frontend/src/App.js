import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.scss";
import Header from "./components/Header";

import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { refresh, userLogin } from "./store/actions/userAction";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.account);

  const a = null;
  console.log(a.adguigjh);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(refresh());
    }
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
