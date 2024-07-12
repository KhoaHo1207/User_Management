import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import Home from "./components/Home";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<TableUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
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
