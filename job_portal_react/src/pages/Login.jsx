import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jobPortalImage from "../assets/jobportal.jpg";
import "../styles/Login.css";
import { loginUser } from "../store/actions/authActions";
import FormInput from "../components/FormInput";
import { useDispatch } from "react-redux";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFieldChange = (name, value) => {
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  };

  const ProceedLogin = async (e) => {
    e.preventDefault();

    if (validate()) {
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
        toast.success(res.data.status.message);
        navigate("/home");
      }
    }
  };

  const validate = () => {
    let result = true;

    if (!credentials.email.trim()) {
      result = false;
      toast.warning("Please enter email");
    }
    if (!credentials.password.trim()) {
      result = false;
      toast.warning("Please enter password");
    }
    return result;
  };

  return (
    <>
      <div className="mainContainer">
        <img src={jobPortalImage} alt="Job Portal Image" />
      </div>
      <div className="vh-100 p-4 d-flex align-items-center">
        <div className="offset-lg-4 col-lg-4">
          <form onSubmit={ProceedLogin} className="container">
            <div id="card" className="card">
              <div id="card-header" className="card-header">
                <h1>Login to Job Portal</h1>
              </div>
              <div className="card-body">
                <FormInput
                  type="text"
                  label="Email"
                  value={credentials.email}
                  onChange={(value) => handleFieldChange("email", value)}
                />
                <FormInput
                  type="password"
                  label="Password"
                  value={credentials.password}
                  onChange={(value) => handleFieldChange("password", value)}
                />
              </div>
              <div id="card-footer" className="card-footer">
                <center>
                  <Button onClick={ProceedLogin} id="login">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
