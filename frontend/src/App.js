import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <TableUser />
      </Container>
    </div>
  );
}

export default App;
