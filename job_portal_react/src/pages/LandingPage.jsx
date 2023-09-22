import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import jobPortalImage from "../assets/jobportal.jpg";
import "../styles/LandingPage.css";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    if (currUser !== null) {
      const currUserRole = currUser.role;
      // console.log("current User role: ", currUser);
      if (currUserRole === "admin" || currUserRole === "job_creator") {
        navigate("/companies");
      } else if (currUserRole === "job_seeker") {
        navigate("/jobSeekerJobs");
      }
    }
  });

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
