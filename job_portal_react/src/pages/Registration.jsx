import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/actions/authActions";
import { toast } from "react-toastify";
import jobPortalImage from "../assets/jobportal.jpg";
import FormInput from "../components/FormInput";
import { Button } from "react-bootstrap";
import "../styles/Registration.css";
import RoleDropdown from "../components/RoleDropdown";

const Registration = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    passwordConfirmation: "",
    role: "job_creator",
  });
  const navigate = useNavigate();

  const handleFieldChange = (name, value) => {
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (e) => {
    handleFieldChange("role", e.target.value);
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
    let errmessage = "Please enter the value in ";

    for (const field in userData) {
      if (!userData[field]) {
        isproceed = false;
        errmessage += field.charAt(0).toUpperCase() + field.slice(1) + ", ";
      }
    }

    if (!isproceed) {
      toast.warning(errmessage.slice(0, -2));
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
        isproceed = false;
        toast.warning("Please enter a valid email");
      }
    }

    return isproceed;
  };

  return (
    <>
      <div className="mainContainer">
        <img src={jobPortalImage} alt="Job Portal Image" />
      </div>
      <div className="">
        <div className="offset-lg-4 col-lg-4">
          <form
            className="container"
            style={{ textAlign: "left" }}
            onSubmit={handleSubmit}
          >
            <div id="card" className="card">
              <div id="card-header" className="card-header">
                <h1>Registration</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <FormInput
                      label="Name"
                      value={userData.name}
                      onChange={(value) => handleFieldChange("name", value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      label="Email"
                      value={userData.email}
                      onChange={(value) => handleFieldChange("email", value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <FormInput
                      label="Password"
                      value={userData.password}
                      type="password"
                      onChange={(value) => handleFieldChange("password", value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      label="Password Confirmation"
                      value={userData.passwordConfirmation}
                      type="password"
                      onChange={(value) =>
                        handleFieldChange("passwordConfirmation", value)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <FormInput
                    type="radio"
                    label="Gender"
                    value={userData.gender}
                    onChange={(value) => handleFieldChange("gender", value)}
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  />
                </div>
                <div className="col-lg-6">
                  <RoleDropdown
                    value={userData.role}
                    onChange={handleRoleChange}
                  />
                </div>
              </div>
              <div id="card-footer" className="card-footer">
                <center>
                  <Button
                    // variant="contained"
                    // color="secondary"
                    type="submit"
                    id="register-button"
                  >
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
