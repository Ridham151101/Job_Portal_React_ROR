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

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUpdatedCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  }, []);

  const handleSave = useCallback(() => {
    onSave(updatedCompany);
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
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={updatedCompany.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={updatedCompany.email}
              onChange={handleInputChange}
            />
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
            />
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
