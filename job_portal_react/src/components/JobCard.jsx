import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/CompanyCard.css";
import DetailedJobCard from "./DetailedJobCard";
import { useSelector } from "react-redux";

const JobCard = React.memo(({ job, onEdit, onDelete, handleApplyJob }) => {
  // console.log("company Card Component");
  // const { companyId } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const userRole = useSelector((state) => state.auth.currUser.role);
  const navigate = useNavigate();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const canSeeArrow = userRole === "job_creator" || userRole === "admin";

  // console.log("canSeeArrow: ", canSeeArrow);

  return (
    <Card className="m-5 job-card">
      <Card.Body>
        {canSeeArrow && (
          <Link to={"/companies"} className="card-link">
            <div className="back-corner">
              <div className="back-arrow">←</div>
            </div>
          </Link>
        )}
        <Link
          to={`/companies/${job.company_id}/jobs/${job.id}`}
          className="card-link"
        >
          <div className="go-corner" onClick={toggleDetails}>
            <div className="go-arrow">→</div>
          </div>
        </Link>
        {showDetails && <DetailedJobCard />}
        <div style={{ marginTop: "20px" }} className="card-content">
          <h3>{job.title}</h3>
          <p>Location: {job.location}</p>
          <p>Openings: {job.openings}</p>
          <p>Status: {job.status}</p>
        </div>
        {userRole === "job_seeker" ? (
          <Button
            className="show-user"
            variant="contained"
            onClick={() => handleApplyJob(job)}
          >
            Apply for Job
          </Button>
        ) : (
          <>
            <Button
              className="show-user"
              variant="contained"
              onClick={() =>
                navigate(
                  `/companies/${job.company_id}/jobs/${job.id}/job_applicants`
                )
              }
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
          </>
        )}
      </Card.Body>
    </Card>
  );
});

export default JobCard;
