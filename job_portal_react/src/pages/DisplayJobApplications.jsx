import { useEffect, useState } from "react";
import axiosInstance from "../api/axios-interceptor";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Table } from "react-bootstrap";
import JobApplicationTable from "../components/JobApplicationTable";

const DisplayJobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const { companyId, jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/companies/${companyId}/jobs/${jobId}/job_applicants`
        );
        // console.log("job_applications: ", response.data.data);
        setJobApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching job_applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  return (
    <>
      <div className="p-8">
        <Button
          onClick={() => navigate(`/companies/${companyId}/jobs`)}
          className="m-4"
          id="buttons"
        >
          Back
        </Button>

        {jobApplications.length === 0 && (
          <div className="alert">
            <Alert
              style={{
                width: "50%",
                textAlign: "center",
                fontSize: "20px",
              }}
              variant="info"
            >
              No job applications are available.{" "}
            </Alert>
          </div>
        )}

        <div className="m-4 d-flex flex-wrap justify-content-around">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Notice Period</th>
                <th>CCTC</th>
                <th>ECTC</th>
                <th>Experience</th>
                <th>Resume URL</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {jobApplications.map((jobApplication, index) => (
                <JobApplicationTable
                  key={jobApplication.id}
                  jobApplication={jobApplication}
                  index={index + 1}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DisplayJobApplications;
