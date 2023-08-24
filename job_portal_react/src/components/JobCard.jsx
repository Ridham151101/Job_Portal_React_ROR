import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/CompanyCard.css";
import DetailedJobCard from "./DetailedJobCard";

const JobCard = React.memo(({ job, onEdit, onDelete }) => {
  // console.log("company Card Component");
  const { companyId } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Card className="m-5 job-card">
      <Card.Body>
        <Link to={"/companies"} className="card-link">
          <div className="back-corner" onClick={() => navigate("/companies")}>
            <div className="back-arrow">←</div>
          </div>
        </Link>
        <Link
          to={`/companies/${companyId}/jobs/${job.id}`}
          className="card-link"
        >
          <h3>{job.title}</h3>
          <div className="go-corner" onClick={toggleDetails}>
            <div className="go-arrow">→</div>
          </div>
        </Link>
        {showDetails && <DetailedJobCard />}
        <div className="card-content">
          <p>Location: {job.location}</p>
          <p>Openings: {job.openings}</p>
          <p>Status: {job.status}</p>
        </div>
        <Button
          className="show-user"
          variant="contained"
          onClick={() => navigate(`/companies/${companyId}/jobs`)}
        >
          Show Applicants
        </Button>
        <Button
          className="edit-button mx-2"
          variant="contained"
          onClick={() => onEdit(job)}
        >
          <EditIcon />
        </Button>
        <Button
          className="delete-button"
          variant="danger"
          onClick={() => onDelete(job)}
        >
          <DeleteIcon />
        </Button>
      </Card.Body>
    </Card>
  );
});

export default JobCard;
