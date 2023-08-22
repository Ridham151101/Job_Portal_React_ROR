import { FormSelect } from "react-bootstrap";

const RoleDropdown = ({ value, onChange }) => {
  return (
    <FormSelect value={value} onChange={onChange}>
      <option value="job_creator">Job Creator</option>
      <option value="job_seeker">Job Seeker</option>
    </FormSelect>
  );
};

export default RoleDropdown;
