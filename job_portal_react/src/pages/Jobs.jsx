import { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axios-interceptor";
import JobCard from "../components/JobCard";
import { useParams } from "react-router-dom";
import { Alert, Button, ButtonGroup } from "react-bootstrap";
import CreateJobModal from "../components/CreateJobModal";
import EditJobModal from "../components/EditJobModal";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { companyId } = useParams();
  const [editJob, setEditJob] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("all");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/companies/${companyId}/jobs`
      );
      // console.log("jobs: ", response.data.data);
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching Jobs:", error);
    }
  };

  const handleCreateJobSave = async (newJobData) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/companies/${companyId}/jobs`,
        newJobData
      );

      await fetchJobs();
      // setJobs((prevJobs) => [...prevJobs, response.data.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating Job:", error);
    }
  };

  const handleEditJob = useCallback((job) => {
    setEditJob(job);
  }, []);

  const handleUpdateJob = async (jobId, updatedData) => {
    try {
      await axiosInstance.patch(
        `/api/v1/companies/${companyId}/jobs/${jobId}`,
        updatedData
      );
      // const updatedJobs = jobs.map((j) =>
      //   j.id === jobId ? { ...j, ...updatedData } : j
      // );
      // setJobs(updatedJobs);
      await fetchJobs();
      setEditJob(null);
    } catch (error) {
      console.error("Error updating Job:", error);
    }
  };

  const handleDeleteJob = useCallback(
    async (job) => {
      try {
        await axiosInstance.delete(
          `/api/v1/companies/${companyId}/jobs/${job.id}`
        );
        // const updatedJobs = jobs.filter((j) => j.id !== job.id);
        // setJobs(updatedJobs);
        await fetchJobs();
      } catch (error) {
        console.error("Error deleting Job:", error);
      }
    },
    [jobs]
  );

  const handleCreateJob = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const filteredJobs = useMemo(() => {
    // console.log("Filtering jobs using useMemo");

    if (currentStatus === "all") {
      return jobs;
    } else {
      return jobs.filter((job) => job.status === currentStatus);
    }
  }, [jobs, currentStatus]);

  return (
    <>
      <div className="p-8">
        <div className="d-flex justify-content-between">
          <Button className="m-4" id="buttons" onClick={handleCreateJob}>
            Create Job
          </Button>
          <ButtonGroup className="m-4">
            <Button
              id="buttons"
              variant={currentStatus === "all" ? "primary" : "outline-primary"}
              onClick={() => setCurrentStatus("all")}
            >
              All Jobs
            </Button>
            <Button
              id="buttons"
              variant={currentStatus === "open" ? "primary" : "outline-primary"}
              onClick={() => setCurrentStatus("open")}
            >
              Open Jobs
            </Button>
            <Button
              id="buttons"
              variant={
                currentStatus === "closed" ? "primary" : "outline-primary"
              }
              onClick={() => setCurrentStatus("closed")}
            >
              Closed Jobs
            </Button>
          </ButtonGroup>
        </div>
        <div className="alert">
          {jobs.length === 0 && (
            <Alert
              style={{
                width: "50%",
                textAlign: "center",
                fontSize: "20px",
              }}
              variant="info"
            >
              No jobs are available.{" "}
            </Alert>
          )}
        </div>

        <div className="m-4 d-flex flex-wrap justify-content-around">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      </div>
      {showCreateModal && (
        <CreateJobModal
          show={showCreateModal}
          onHide={handleCloseCreateModal}
          onSave={handleCreateJobSave}
        />
      )}
      {editJob && (
        <EditJobModal
          job={editJob}
          show={true}
          onHide={() => setEditJob(null)}
          onSave={(updatedData) => handleUpdateJob(editJob.id, updatedData)}
        />
      )}
    </>
  );
};

export default Jobs;
