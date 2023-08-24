import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/CompanyCard.css";

const CompanyCard = React.memo(({ company, onEdit, onDelete }) => {
  // console.log("company Card Component");
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Card className="m-5 custom-card">
      <Card.Body>
        <Link to={`/companies/${company.id}`} className="card-link">
          <h3>{company.name}</h3>
          <div className="go-corner" onClick={toggleDetails}>
            <div className="go-arrow">→</div>
          </div>
        </Link>
        {showDetails && <DetailedCompanyCard />}
        <div className="card-content">
          <p>Location: {company.address}</p>
          <p>Email: {company.email}</p>
          <p>Description: {company.description}</p>
        </div>
        <Button
          className="show-user"
          variant="contained"
          onClick={() => navigate(`/companies/${company.id}/jobs`)}
        >
          Show Jobs
        </Button>
        <Button
          className="edit-button mx-2"
          variant="contained"
          onClick={() => onEdit(company)}
        >
          <EditIcon />
        </Button>
        <Button
          className="delete-button"
          variant="danger"
          onClick={() => onDelete(company)}
        >
          <DeleteIcon />
        </Button>
      </Card.Body>
    </Card>
  );
});

export default CompanyCard;
