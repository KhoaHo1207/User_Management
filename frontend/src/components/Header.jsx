import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/logo192.png";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
function Header() {
  const { user, logout } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  // const [showHeader, setShowHeader] = useState(true);
  const handleLogout = () => {
    logout();
    toast.success("Logout Successfully!");
    navigate("/login");
    // setToken(null);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <Link to={"/"} className="text-decoration-none text-dark  ">
            <img
              src={Logo}
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span>KhoaIT's App</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && user.auth === true && (
            <Nav className="me-auto" activeKey={location.pathname}>
              <Nav.Link>
                <NavLink to={"/"} className="text-dark text-decoration-none">
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to={"/users"}
                  className="text-dark text-decoration-none"
                >
                  Mange Users
                </NavLink>
              </Nav.Link>
            </Nav>
          )}
          <Nav>
            {user && user.auth === true && (
              <span className="nav-link">Welcome {user.email}</span>
            )}
            <NavDropdown title="Setting" className="text-dark">
              {user && user.auth === false ? (
                <NavLink to={"/login"} className="dropdown-item">
                  Login
                </NavLink>
              ) : (
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
              )}
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
