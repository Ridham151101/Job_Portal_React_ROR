import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/actions/userActions";
import EditProfileModal from "../components/EditProfileModel";
import { toast } from "react-toastify";

const UserProfile = () => {
  const currUser = useSelector((state) => state.auth.currUser);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (isValidate()) {
      const updateData = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
      };

      const res = await updateProfile(updateData);
      if (res.message === "Network Error") {
        toast.error("Network Error, Check your server");
      } else if (res.response?.status >= 400 && res?.response?.status <= 499) {
        toast.error("Error in Updation of Profile");
      } else {
        dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: res.data.data });
        localStorage.removeItem("currUser");
        localStorage.setItem("currUser", JSON.stringify(res.data.data.user));
        toast.success("Profile updated successfully!");
        setShowModal(false);
      }
    }
  };

  const isValidate = () => {
    let isproceed = true;
    const errors = {};

    if (!formData.name) {
      isproceed = false;
      errors.name = "Please enter your name";
    }

    if (!formData.email) {
      isproceed = false;
      errors.email = "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      isproceed = false;
      errors.email = "Please enter a valid email address";
    }

    if (!formData.gender) {
      isproceed = false;
      errors.gender = "Please select a gender";
    }

    setFieldErrors(errors);
    return isproceed;
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(currUser);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title">Name: {currUser.name}</h1>
          <p className="card-text">Email: {currUser.email}</p>
          <p className="card-text">Gender: {currUser.gender}</p>
          <p className="card-text">Role: {currUser.role}</p>
          <Button id="buttons" onClick={handleOpenModal}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Render the Edit Profile modal */}
      <EditProfileModal
        show={showModal}
        handleClose={handleCloseModal}
        formData={formData}
        fieldErrors={fieldErrors}
        handleInputChange={handleInputChange}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default UserProfile;
