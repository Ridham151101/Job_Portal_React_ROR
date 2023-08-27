import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios-interceptor";
import { Link } from "react-router-dom";
import "../styles/DetailedCompanyCard.css";
import { useSelector } from "react-redux";
import CreateReviewModal from "./CreateReviewModal";
import { toast } from "react-toastify";

const DetailedCompanyCard = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.currUser.role);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3001/api/v1/companies/${companyId}`
        );
        setCompany(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company:", error);
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  const submitReview = async (formData) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/companies/${companyId}/reviews`,
        formData
      );
      handleCreateReviewModalClose();
      toast.success("review submitted successfully");
    } catch (error) {
      toast.error("error In submitting the review");
      console.error("Error submitting review:", error);
    }
  };

  const handleCreateReviewModalOpen = () => {
    setShowCreateReviewModal(true);
  };

  const handleCreateReviewModalClose = () => {
    setShowCreateReviewModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="detailed-card">
        <h1>{company.name}</h1>
        <div className="company-details">
          <p>Description: {company.description}</p>
          <p>Address: {company.address}</p>
          <p>Email: {company.email}</p>
          <p>Contact: {company.phone_number}</p>
        </div>

        <div className="back-button">
          {userRole === "job_seeker" ? (
            <div className="company-button-group">
              <button
                className="back-link"
                onClick={handleCreateReviewModalOpen}
              >
                Write a Review
              </button>
              <Link to={"/job_applications"} className="back-link">
                Back to Job Applications
              </Link>
            </div>
          ) : (
            <div className="company-button-group">
              <button
                className="back-link"
                onClick={() => navigate(`/companies/${company.id}/reviews`)}
              >
                Show Reviews
              </button>
              <Link to={"/companies"} className="back-link">
                Back to Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
      <CreateReviewModal
        show={showCreateReviewModal}
        onHide={handleCreateReviewModalClose}
        onSubmit={submitReview}
      />
    </div>
  );
};

export default DetailedCompanyCard;
