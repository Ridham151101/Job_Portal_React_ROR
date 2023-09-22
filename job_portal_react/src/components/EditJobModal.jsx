import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditJobModal = React.memo(({ show, onHide, job, onSave }) => {
  const [editedJob, setEditedJob] = useState({ ...job });
  const [validationErrors, setValidationErrors] = useState({});

  // console.log("editedJob:", editedJob);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prevJob) => ({
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

    if (!editedJob.title) {
      errors.title = "Title is required";
    }

    if (!editedJob.location) {
      errors.location = "Location is required";
    }

    if (!editedJob.salary) {
      errors.salary = "Salary is required";
    } else if (!/^\d+$/.test(editedJob.salary)) {
      errors.salary = "Invalid salary format";
    }

    if (!editedJob.requirments) {
      errors.requirments = "Requirements are required";
    }

    if (!editedJob.openings) {
      errors.openings = "Openings is required";
    } else if (!/^\d+$/.test(editedJob.openings)) {
      errors.openings = "Invalid openings format";
    }

    if (!editedJob.status) {
      errors.status = "Status is required";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSave(editedJob);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedJob.title}
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
              value={editedJob.location}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.location}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.location}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={editedJob.salary}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.salary}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.salary}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="requirments">
            <Form.Label>Requirements</Form.Label>
            <Form.Control
              type="text"
              name="requirments"
              value={editedJob.requirments}
              onChange={handleInputChange}
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
              value={editedJob.openings}
              onChange={handleInputChange}
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
              value={editedJob.status}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.status}
            >
              <option value="">Select status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {validationErrors.status}
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

export default EditJobModal;
