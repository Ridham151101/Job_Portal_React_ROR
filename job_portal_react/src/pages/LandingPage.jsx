import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jobPortalImage from "../assets/jobportal.jpg";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <div className="main-container">
        <img src={jobPortalImage} alt="Job Portal Image" />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center h-100 sub-container">
        <span className="heading">Welcome to the Job Portal</span>
        <div>
          <Link to="/login">
            <Button id="login-button">Login</Button>
          </Link>
          <Link to="/signup">
            <Button id="account-request-button">Registration</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
