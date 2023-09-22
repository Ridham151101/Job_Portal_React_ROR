import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios-interceptor";
import JobCard from "../components/JobCard";
import ApplyJobModal from "../components/ApplyJobModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";

function JobSeekerJobs() {
  const [jobs, setJobs] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [page, setPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const fetchOpenJobs = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/open_jobs");
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching open jobs:", error);
      }
    };

    fetchOpenJobs();
  }, []);

  const handleApplyJob = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleApplyJobSave = async (newJobApplicationData) => {
    // console.log("newJobData: ", newJobApplicationData);
    try {
      const response = await axiosInstance.post(
        `/api/v1/companies/${selectedJob.company_id}/jobs/${selectedJob.id}/job_applications`,
        newJobApplicationData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important header for file uploads
          },
        }
      );
      setShowApplyModal(false);
      toast.success("job applied successfully.");
    } catch (error) {
      console.error("Error creating Job Application:", error);
    }
  };

  const handleCloseApplyModal = () => {
    setSelectedJob(null);
    setShowApplyModal(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToDisplay = jobs.slice(startIndex, endIndex);

  return (
    <div className="p-8">
      <div className="m-4 d-flex flex-wrap justify-content-around">
        {jobsToDisplay.map((job) => (
          <JobCard key={job.id} job={job} handleApplyJob={handleApplyJob} />
        ))}
      </div>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          count={Math.ceil(jobs.length / jobsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>

      {showApplyModal && (
        <ApplyJobModal
          show={showApplyModal && selectedJob !== null}
          onHide={handleCloseApplyModal}
          onSave={handleApplyJobSave}
        />
      )}
    </div>
  );
}

export default JobSeekerJobs;
