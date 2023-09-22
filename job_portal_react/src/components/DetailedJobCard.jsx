import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios-interceptor";
import { Link } from "react-router-dom";
import "../styles/DetailedCompanyCard.css";
import { useSelector } from "react-redux";

const DetailedJobCard = () => {
  const { companyId, jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const userRole = useSelector((state) => state.auth.currUser.role);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3001/api/v1/companies/${companyId}/jobs/${jobId}`
        );
        setJob(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company:", error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="detailed-card">
        <h1>{job.title}</h1>
        <div className="company-details">
          <p>Location: {job.location}</p>
          <p>Requirments: {job.requirments}</p>
          <p>Salary: {job.salary} LPA</p>
          <p>Openings: {job.openings}</p>
          <p>Status: {job.status}</p>
        </div>

        <div className="back-button">
          {userRole === "job_seeker" ? (
            <Link to={`/jobSeekerJobs`} className="back-link">
              Back to Jobs
            </Link>
          ) : (
            <Link to={`/companies/${companyId}/jobs`} className="back-link">
              Back to Jobs
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedJobCard;
