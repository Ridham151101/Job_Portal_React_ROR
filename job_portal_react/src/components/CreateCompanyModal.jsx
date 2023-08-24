import React, { useState, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateCompanyModal = ({ show, onHide, onSave }) => {
  const [newCompany, setNewCompany] = useState({
    name: "",
    address: "",
    email: "",
    description: "",
    phone_number: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    address: "",
    email: "",
    description: "",
    phone_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSave = () => {
    const errors = {};
    if (!newCompany.name) errors.name = "Name is required";
    if (!newCompany.address) errors.address = "Address is required";

    // Email validation
    if (!newCompany.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newCompany.email)) {
      errors.email = "Invalid email format";
    }

    // Phone number validation
    if (!newCompany.phone_number) {
      errors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(newCompany.phone_number)) {
      errors.phone_number = "Phone number must be 10 digits";
    }

    if (!newCompany.description) errors.description = "Description is required";

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSave(newCompany);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newCompany.name}
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
              value={newCompany.address}
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
              value={newCompany.email}
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
              value={newCompany.description}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.description}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone_number">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={newCompany.phone_number}
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
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCompanyModal;
