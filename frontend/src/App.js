import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <TableUser />
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
