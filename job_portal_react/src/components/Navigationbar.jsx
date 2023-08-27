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
  const currUserRole = useSelector((state) => state.auth.currUser.role);

  const getHomePath = () => {
    if (currUserRole === "admin" || currUserRole === "job_creator") {
      return "/companies";
    } else {
      return "/jobSeekerJobs";
    }
  };

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");

    if (isConfirmed) {
      const res = await logoutUser();
      // console.log("logout api res: ", res);
      if (res.message === "Network Error") {
        toast.error("Network Error, Check your server");
      } else if (res.response?.status >= 400 && res?.response?.status <= 499) {
        toast.error("There are some problem in logout");
      } else {
        // console.log("hello in navigation bar");
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        navigate("/");
      }
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
              <Link to={getHomePath()} className="navbar-link">
                Home
              </Link>
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
            </>

            {currUserRole === "job_seeker" && (
              <>
                <Link to="/job_applications" className="navbar-link">
                  Applied Jobs
                </Link>
                <Link to="/portfolios" className="navbar-link">
                  Portfolio
                </Link>
              </>
            )}

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
