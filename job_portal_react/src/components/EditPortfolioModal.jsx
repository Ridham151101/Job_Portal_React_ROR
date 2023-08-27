import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";

function EditPortfolioModal({ show, onHide, onSubmit, portfolio }) {
  const [formData, setFormData] = useState({
    title: portfolio.title || "",
    about_user: portfolio.about_user || "",
    experience: portfolio.experience || "",
    skills: portfolio.skills || "",
    education: portfolio.education || "",
    linkdin_url: portfolio.linkdin_url || "",
  });

  const [validationErrors, setValidationErrors] = useState({
    title: "",
    about_user: "",
    experience: "",
    skills: "",
    education: "",
    linkdin_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const isValidLinkedInUrl = (url) => {
    const pattern = /^(https:\/\/www\.linkedin\.com\/)/;
    return pattern.test(url);
  };

  const handleSubmit = (e) => {
    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `${key.replace("_", " ")} is required`;
      }
    }

    if (formData.linkdin_url && !isValidLinkedInUrl(formData.linkdin_url)) {
      errors.linkdin_url = "Invalid LinkedIn URL";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit(formData, portfolio.id);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Portfolio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.title}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="about_user">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="about_user"
              value={formData.about_user}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.about_user}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.about_user}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="experience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.experience}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.experience}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="skills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.skills}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.skills}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="education">
            <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.education}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.education}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="linkdin_url">
            <Form.Label>LinkedIn URL</Form.Label>
            <Form.Control
              type="text"
              name="linkdin_url"
              value={formData.linkdin_url}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.linkdin_url}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.linkdin_url}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button id="buttons" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPortfolioModal;
