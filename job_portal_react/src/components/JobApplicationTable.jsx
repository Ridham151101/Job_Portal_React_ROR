import React from "react";

const JobApplicationTable = React.memo(({ jobApplication, index }) => {
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
    <tr>
      <td>{index}</td>
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
  );
});

export default JobApplicationTable;
