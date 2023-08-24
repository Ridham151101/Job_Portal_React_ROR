import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/actions/authActions";
import jobPortalImage from "../assets/jobportal.jpg";
import { Form, Button } from "react-bootstrap";
import FormField from "../components/FormField";
import "../styles/Registration.css";
import { toast } from "react-toastify";

const Registration = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    passwordConfirmation: "",
    role: "job_creator",
  });
  const [fieldErrors, setFieldErrors] = useState({});
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

  const handleFieldChange = (name, value) => {
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidate()) {
      const res = await registerUser(userData);
      // console.log("response after registration: ", res.message);
      if (res.message === "Network Error") {
        toast.error("Network Error, Check your server");
      } else if (res.data.status.code === 200) {
        toast.success("User Created Successfully.");
        navigate("/login");
      } else {
        toast.error(res.data.status.message);
      }
    }
  };

  const isValidate = () => {
    let isproceed = true;
    const errors = {};

    if (!userData.name) {
      isproceed = false;
      errors.name = "Please enter your name";
    }

    if (!userData.email) {
      isproceed = false;
      errors.email = "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)
    ) {
      isproceed = false;
      errors.email = "Please enter a valid email address";
    }

    if (!userData.password) {
      isproceed = false;
      errors.password = "Please enter a password";
    }

    if (!userData.passwordConfirmation) {
      isproceed = false;
      errors.passwordConfirmation = "Please enter confirm your password";
    } else if (userData.password !== userData.passwordConfirmation) {
      isproceed = false;
      errors.passwordConfirmation = "Passwords do not match";
    }

    if (!userData.gender) {
      isproceed = false;
      errors.gender = "Please select a gender";
    }

    setFieldErrors(errors);
    return isproceed;
  };

  return (
    <>
      <div className="mainContainer">
        <img src={jobPortalImage} alt="Job Portal Image" />
      </div>
      <div className="vh-100 p-4 d-flex align-items-center">
        <div className="offset-lg-4 col-lg-4">
          <Form
            className="container"
            style={{ textAlign: "left" }}
            onSubmit={handleSubmit}
          >
            <div id="card" className="card">
              <div id="card-header" className="card-header">
                <h1>Registration</h1>
              </div>
              <div className="card-body">
                <FormField
                  controlId="name"
                  label="Name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  isInvalid={!!fieldErrors.name}
                  feedbackText={fieldErrors.name}
                />
                <FormField
                  controlId="email"
                  label="Email"
                  type="text"
                  value={userData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  isInvalid={!!fieldErrors.email}
                  feedbackText={fieldErrors.email}
                />
                <FormField
                  controlId="password"
                  label="Password"
                  type="password"
                  value={userData.password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  isInvalid={!!fieldErrors.password}
                  feedbackText={fieldErrors.password}
                />
                <FormField
                  controlId="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  value={userData.passwordConfirmation}
                  onChange={(e) =>
                    handleFieldChange("passwordConfirmation", e.target.value)
                  }
                  isInvalid={!!fieldErrors.passwordConfirmation}
                  feedbackText={fieldErrors.passwordConfirmation}
                />
                <FormField
                  controlId="gender"
                  label="Gender"
                  type="radio"
                  value={userData.gender}
                  onChange={(e) => handleFieldChange("gender", e.target.value)}
                  isInvalid={!!fieldErrors.gender}
                  feedbackText={fieldErrors.gender}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                />
                <FormField
                  controlId="role"
                  label="Role"
                  type="select"
                  value={userData.role}
                  onChange={(e) => handleFieldChange("role", e.target.value)}
                  options={[
                    { label: "Job Creator", value: "job_creator" },
                    { label: "Job Seeker", value: "job_seeker" },
                  ]}
                />
              </div>
              <div id="card-footer" className="card-footer">
                <center>
                  <Button type="submit" id="register-button">
                    Register
                  </Button>
                </center>
                <center>
                  <Link to="/login">
                    <u>Do You Have an Account?</u>
                  </Link>
                </center>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Registration;
