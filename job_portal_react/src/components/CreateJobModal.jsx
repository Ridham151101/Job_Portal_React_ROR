import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateJobModal = ({ show, onHide, onSave }) => {
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    requirments: "",
    salary: "",
    openings: "",
    status: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    title: "",
    location: "",
    requirments: "",
    salary: "",
    openings: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSave = () => {
    const errors = {};
    if (!newJob.title) errors.title = "Title is required";
    if (!newJob.location) errors.location = "Location is required";
    if (!newJob.requirments) errors.requirments = "Requirements is required";
    if (!newJob.status) errors.status = "Status is required";
    if (!newJob.salary) {
      errors.salary = "Salary is required";
    } else if (!/^\d+$/.test(newJob.salary)) {
      errors.salary = "Invalid salary format";
    } else {
      const salaryValue = parseInt(newJob.salary, 10);
      if (salaryValue < 1 || salaryValue > 1000) {
        errors.salary = "Salary must be between 1 and 1000";
      }
    }
    if (!newJob.openings) {
      errors.openings = "Openings is required";
    } else if (!/^\d+$/.test(newJob.openings)) {
      errors.openings = "openings must be a number";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSave(newJob);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newJob.title}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.title}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={newJob.location}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.location}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.location}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="salary">
            <Form.Label>Salary(LPA)</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={newJob.salary}
              onChange={handleInputChange}
              placeholder="Enter salary"
              isInvalid={!!validationErrors.salary}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.salary}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="requirments">
            <Form.Label>Requirments</Form.Label>
            <Form.Control
              as="textarea"
              name="requirments"
              value={newJob.requirments}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.requirments}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.requirments}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="openings">
            <Form.Label>Openings</Form.Label>
            <Form.Control
              type="number"
              name="openings"
              value={newJob.openings}
              onChange={handleInputChange}
              placeholder="Enter number of openings"
              isInvalid={!!validationErrors.openings}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.openings}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={newJob.status}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.status}
            >
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {validationErrors.status}
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

export default CreateJobModal;
