import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios-interceptor";
import { Link } from "react-router-dom";
import "../styles/DetailedCompanyCard.css";

const DetailedCompanyCard = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <Link to="/companies" className="back-link">
            Back to Companies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailedCompanyCard;
