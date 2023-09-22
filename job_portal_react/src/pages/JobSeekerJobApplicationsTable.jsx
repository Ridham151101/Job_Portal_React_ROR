import { useEffect, useState } from "react";
import axiosInstance from "../api/axios-interceptor";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function JobSeekerJobApplicationsTable() {
  const [jobApplications, setJobApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/job_applications");
        setJobApplications(response.data.data);
        // console.log("response:", response.data.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  const openResumeUrl = (application_resume_url) => {
    window.open("http://127.0.0.1:3001" + application_resume_url, "_blank");
  };

  return (
    <div className="container mt-4">
      <h2>Your Job Applications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Job Location</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((application) => (
            <tr key={application.id}>
              <td>{application.job_title}</td>
              <td>{application.company_name}</td>
              <td>{application.job_location}</td>
              <td>
                <span
                  onClick={() =>
                    openResumeUrl(application.application_resume_url)
                  }
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  View Resume
                </span>
              </td>
              <td>
                <Button
                  className="company-details-button"
                  onClick={() =>
                    navigate(`/companies/${application.company_id}`)
                  }
                >
                  Company Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default JobSeekerJobApplicationsTable;
