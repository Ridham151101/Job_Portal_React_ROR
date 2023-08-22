import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jobPortalVideo from "../assets/jobportal.mp4";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <div className="main-container">
        <video autoPlay loop muted className="video">
          <source src={jobPortalVideo} type="video/mp4" />
        </video>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center h-100 sub-container">
        <span className="heading">Welcome to the Job Portal</span>
        <div>
          <Link to="/login">
            <Button id="login-button">Login</Button>
          </Link>
          <Link to="/signup">
            <Button id="signup-button">Registration</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
