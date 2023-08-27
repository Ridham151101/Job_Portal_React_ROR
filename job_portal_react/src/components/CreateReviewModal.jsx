import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Rating from "@mui/material/Rating";

function CreateReviewModal({ show, onHide, onSubmit }) {
  const [formData, setFormData] = useState({
    review_text: "",
    rating: 1,
  });

  const [validationErrors, setValidationErrors] = useState({});

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

  const handleSubmit = (e) => {
    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `${key.replace("_", " ")} is required`;
      }
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
      setFormData({
        review_text: "",
        rating: 1,
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Give Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="review_text">
            <Form.Label style={{ fontSize: "20px" }}>Review: </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="review_text"
              value={formData.review_text}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.review_text}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.review_text}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group className="rating" controlId="rating">
            <Form.Label style={{ fontSize: "20px", marginBottom: "0" }}>
              Ratings:{" "}
            </Form.Label>
            <Rating
              style={{ fontSize: "40px" }}
              name="rating"
              value={formData.rating}
              onChange={(event, newValue) => {
                handleInputChange({
                  target: {
                    name: "rating",
                    value: newValue,
                  },
                });
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button id="buttons" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateReviewModal;
