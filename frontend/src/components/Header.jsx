import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/logo192.png";
import { Link, useLocation, NavLink } from "react-router-dom";
function Header() {
  const location = useLocation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={Logo}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span>KhoaIT's App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link>
              <NavLink to={"/"} className="text-dark text-decoration-none">
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to={"/users"} className="text-dark text-decoration-none">
                Mange Users
              </NavLink>
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="Account"
              id="basic-nav-dropdown"
              className="text-dark"
            >
              <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
