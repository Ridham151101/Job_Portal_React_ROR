import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/authActions";
import { toast } from "react-toastify";

const Navigationbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");

    if (isConfirmed) {
      const res = await logoutUser(token);
      console.log("logout api res: ", res);
      if (res.message === "Network Error") {
        toast.error("Network Error, Check your server");
      } else if (res.response?.status >= 400 && res?.response?.status <= 499) {
        toast.error("There are some problem in logout");
      } else {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        toast.success("Logged Out Successfully");
        navigate("/");
      }
    } else {
      // If "No" is clicked, return to the homepage
      navigate("/home");
    }
  };

  return (
    <Navbar expand="lg" style={{ background: "#34487a" }}>
      <Container fluid>
        <Navbar.Brand
          href="/"
          style={{ color: "#fff", fontSize: "25px", fontWeight: "600" }}
        >
          Job Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <>
              {/* Common buttons for all logged-in users */}
              <Link to="/home" className="navbar-link">
                Home
              </Link>
            </>

            <Button id="logout-button" variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
