import React,{useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./../App.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "react-toastify";

function PageHeader() {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.replace("/");
    toast.success("Logged out successfully", { autoClose: 3000 });
  };

  useEffect(()=>{

  },[localStorage])

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/" className="text-info brand-name">RENTIFY</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="#"
              className="nav-link"
              onClick={() => history.push("/")}
            >
              {" "}
              Home{" "}
            </Nav.Link>
            <Nav.Link
              href="#"
              className="nav-link"
              onClick={() => history.push("/products")}
            >
              {" "}
              Products{" "}
            </Nav.Link>
            <Nav.Link
              href="#"
              className="nav-link"
              onClick={() => history.push("/contact")}
            >
              {" "}
              Contact Us{" "}
            </Nav.Link>
          </Nav>
          <Nav className="d-flex justify-content-end">
            <div className="d-flex justify-content-between">
                {!(localStorage.getItem('user'))? (
                  <button
                    onClick={() => history.push("/login")}
                    className="btn btn-outline-success"
                  >
                    Login
                  </button>
                ) : (
                  <div className="d-flex justify-content-between">
                  <div className="mx-md-3 mx-sm-0 d-flex align-items-center">
                  <h6 className="text-light mx-md-2 mx-sm-0">
                    {localStorage.getItem("user")}{" "}
                    <MdAccountCircle color="white" size="32px" />{" "}
                  </h6>
                  </div>
                <Button
                variant="outline-danger"
                onClick={handleLogout}
                className="d-flex align-items-center"
                >Logout</Button>
              </div>
              )
              }
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default PageHeader;
