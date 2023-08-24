import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axios-interceptor";
import JobCard from "../components/JobCard";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateJobModal from "../components/CreateJobModal";
import EditJobModal from "../components/EditJobModal";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { companyId } = useParams();
  const [editJob, setEditJob] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3001/api/v1/companies/${companyId}/jobs`
        );
        // console.log("jobs: ", response.data.data);
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching Jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleCreateJobSave = async (newJobData) => {
    try {
      const response = await axiosInstance.post(
        `http://localhost:3001/api/v1/companies/${companyId}/jobs`,
        newJobData
      );

      setJobs((prevJobs) => [...prevJobs, response.data.data]);
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
        `http://localhost:3001/api/v1/companies/${companyId}/jobs/${jobId}`,
        updatedData
      );
      const updatedJobs = jobs.map((j) =>
        j.id === jobId ? { ...j, ...updatedData } : j
      );
      setJobs(updatedJobs);
      setEditJob(null);
    } catch (error) {
      console.error("Error updating Job:", error);
    }
  };

  const handleDeleteJob = useCallback(
    async (job) => {
      try {
        await axiosInstance.delete(
          `http://localhost:3001/api/v1/companies/${companyId}/jobs/${job.id}`
        );
        const updatedJobs = jobs.filter((j) => j.id !== job.id);
        setJobs(updatedJobs);
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

  return (
    <>
      <div className="p-8">
        <Button className="m-4" id="buttons" onClick={handleCreateJob}>
          Create Job
        </Button>
        <div className="m-4 d-flex flex-wrap justify-content-around">
          {jobs.map((job) => (
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
