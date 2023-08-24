import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jobPortalImage from "../assets/jobportal.jpg";
import "../styles/Login.css";
import { loginUser } from "../store/actions/authActions";
import { useDispatch } from "react-redux";
import FormField from "../components/FormField";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  };

  const ProceedLogin = async (e) => {
    e.preventDefault();

    if (isValidate()) {
      const res = await loginUser(credentials);
      // console.log("login Response : ", res);
      if (res.message === "Network Error") {
        toast.error("Network Error, Check your server");
      } else if (res.response?.status >= 400 && res?.response?.status <= 499) {
        toast.error("Email or Password is wrong");
      } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("currUser", JSON.stringify(res.data.data.user));
        if (
          res.data.data.user.role === "admin" ||
          res.data.data.user.role === "job_creator"
        ) {
          navigate("/companies");
        } else {
          navigate("/jobSeekerJobs");
        }
      }
    }
  };

  const isValidate = () => {
    let isproceed = true;
    const errors = {};

    if (!credentials.email) {
      isproceed = false;
      errors.email = "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.email)
    ) {
      isproceed = false;
      errors.email = "Please enter a valid email address";
    }

    if (!credentials.password) {
      isproceed = false;
      errors.password = "Please enter a password";
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
            onSubmit={ProceedLogin}
          >
            <div id="card" className="card">
              <div id="card-header" className="card-header">
                <h1>Login to Job Portal</h1>
              </div>
              <div className="card-body">
                <FormField
                  controlId="email"
                  label="Email"
                  type="text"
                  value={credentials.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  isInvalid={!!fieldErrors.email}
                  feedbackText={fieldErrors.email}
                />
                <FormField
                  controlId="password"
                  label="Password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  isInvalid={!!fieldErrors.password}
                  feedbackText={fieldErrors.password}
                />
              </div>
              <div id="card-footer" className="card-footer">
                <center>
                  <Button type="submit" id="register-button">
                    Login
                  </Button>
                </center>
                <center>
                  <Link to="/signup">
                    <u>Create New Account?</u>
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

export default Login;
