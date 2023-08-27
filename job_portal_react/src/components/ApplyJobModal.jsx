import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ApplyJobModal = ({ show, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    notice_period_in_month: "",
    cctc: "",
    ectc: "",
    experience_in_years: "",
    resume: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone_number: "",
    notice_period_in_month: "",
    cctc: "",
    ectc: "",
    experience_in_years: "",
    resume: null,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("file", file);
    setFormData((prevData) => ({
      ...prevData,
      resume: file,
    }));
  };

  const handleSave = async () => {
    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `${key.replace("_", " ")} is required`;
      }
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(`job_application[${key}]`, formData[key]);
      }

      try {
        await onSave(formDataToSend);
        onHide();
      } catch (error) {
        console.error("Error applying for job:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Apply for Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.phone_number}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.phone_number}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.address}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="notice_period_in_month">
            <Form.Label>Notice Period (in months)</Form.Label>
            <Form.Control
              type="number"
              name="notice_period_in_month"
              value={formData.notice_period_in_month}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.notice_period_in_month}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.notice_period_in_month}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="cctc">
            <Form.Label>Current CTC</Form.Label>
            <Form.Control
              type="number"
              name="cctc"
              value={formData.cctc}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.cctc}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.cctc}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="ectc">
            <Form.Label>Expected CTC</Form.Label>
            <Form.Control
              type="number"
              name="ectc"
              value={formData.ectc}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.ectc}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.ectc}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="experience_in_years">
            <Form.Label>Experience (in years)</Form.Label>
            <Form.Control
              type="number"
              name="experience_in_years"
              value={formData.experience_in_years}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.experience_in_years}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.experience_in_years}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="resume">
            <Form.Label>Resume (PDF)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              name="resume"
              onChange={handleFileChange}
              isInvalid={!!validationErrors.resume}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.resume}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button id="buttons" onClick={handleSave}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplyJobModal;
