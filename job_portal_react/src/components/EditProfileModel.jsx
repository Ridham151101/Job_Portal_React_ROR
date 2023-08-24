import { Modal, Button, Form } from "react-bootstrap";
import FormField from "./FormField";

const EditProfileModal = ({
  show,
  handleClose,
  formData,
  fieldErrors,
  handleInputChange,
  handleUpdateProfile,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateProfile}>
          <FormField
            controlId="name"
            label="Name"
            type="text"
            value={formData.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            isInvalid={!!fieldErrors.name}
            feedbackText={fieldErrors.name}
          />
          <FormField
            controlId="email"
            label="Email"
            type="text"
            value={formData.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            isInvalid={!!fieldErrors.email}
            feedbackText={fieldErrors.email}
          />
          <FormField
            controlId="gender"
            label="Gender"
            type="radio"
            value={formData.gender || ""}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            isInvalid={!!fieldErrors.gender}
            feedbackText={fieldErrors.gender}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button id="buttons" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
