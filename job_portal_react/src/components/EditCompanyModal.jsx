import React, { useState, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditCompanyModal = React.memo(({ company, show, onHide, onSave }) => {
  const [updatedCompany, setUpdatedCompany] = useState({
    name: company.name,
    address: company.address,
    email: company.email,
    description: company.description,
    phone_number: company.phone_number,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUpdatedCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleSave = useCallback(() => {
    const errors = {};
    if (!updatedCompany.name) {
      errors.name = "Name is required";
    }
    if (!updatedCompany.description) {
      errors.description = "Description is required";
    }
    if (!updatedCompany.address) {
      errors.address = "Address is required";
    }
    if (!updatedCompany.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(updatedCompany.email)) {
      errors.email = "Invalid email format";
    }
    if (!updatedCompany.phone_number) {
      errors.phone_number = "Contact is required";
    } else if (!validatePhoneNumber(updatedCompany.phone_number)) {
      errors.phone_number = "Invalid phone number format";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSave(updatedCompany);
    }
  }, [onSave, updatedCompany]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedCompany.name}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={updatedCompany.address}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.address}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={updatedCompany.email}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={updatedCompany.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="phone_number">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={updatedCompany.phone_number}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.phone_number}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.phone_number}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button id="buttons" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default EditCompanyModal;
