import React from "react";
import { Table } from "react-bootstrap";

const JobApplicationTable = React.memo(({ jobApplication }) => {
  const truncateUrl = (url, maxLength) => {
    return url.length > maxLength
      ? url.substring(0, maxLength - 3) + "..."
      : url;
  };

  const openResumeUrl = () => {
    window.open(
      "http://127.0.0.1:3001" + jobApplication.application_resume_url,
      "_blank"
    );
  };

  const formattedCreatedAt = new Date(
    jobApplication.created_at
  ).toLocaleString();

  return (
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
        <tr>
          <td>1</td>
          <td>{jobApplication.name}</td>
          <td>{jobApplication.email}</td>
          <td>{jobApplication.phone_number}</td>
          <td>{jobApplication.address}</td>
          <td>{jobApplication.notice_period_in_month}</td>
          <td>{jobApplication.cctc}</td>
          <td>{jobApplication.ectc}</td>
          <td>{jobApplication.experience_in_years}</td>
          <td>
            <span
              onClick={openResumeUrl}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {truncateUrl(jobApplication.application_resume_url, 25)}
            </span>
          </td>
          <td>{formattedCreatedAt}</td>
        </tr>
      </tbody>
    </Table>
  );
});

export default JobApplicationTable;
