import { Form } from "react-bootstrap";

const FormField = ({
  controlId,
  label,
  type,
  value,
  onChange,
  isInvalid,
  feedbackText,
  options = [],
}) => (
  <Form.Group controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    {type === "radio" ? (
      <div>
        {options.map((option, index) => (
          <Form.Check
            key={index}
            type="radio"
            name={controlId}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            isInvalid={isInvalid}
          />
        ))}
      </div>
    ) : type === "select" ? ( // Add this condition for select dropdown
      <Form.Control
        as="select"
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    ) : (
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      />
    )}
    <Form.Control.Feedback type="invalid">{feedbackText}</Form.Control.Feedback>
  </Form.Group>
);

export default FormField;
