import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios-interceptor";
import { useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "react-bootstrap";

function CompanyReview() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { companyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/companies/${companyId}/reviews`
        );
        setReviews(response.data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [companyId]);

  const columns = [
    { id: "review_text", label: "Review Text", minWidth: 200 },
    { id: "rating", label: "Rating", minWidth: 100 },
    { id: "job_seeker_name", label: "Job Seeker Name", minWidth: 170 },
    { id: "created_at", label: "Created At", minWidth: 170 },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="p-8">
        <Button
          className="m-4"
          id="buttons"
          onClick={() => navigate(`/companies/${companyId}`)}
        >
          Back
        </Button>
      </div>
      <div>
        <h2>Reviews for Company</h2>
        {reviews.length === 0 ? (
          <div className="alert alert-info mt-4">
            No reviews available for this company.
          </div>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviews
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((review) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={review.id}
                      >
                        {columns.map((column) => {
                          const value =
                            column.id === "created_at"
                              ? formatDate(review[column.id])
                              : review[column.id];
                          return (
                            <TableCell key={column.id} align="center">
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={reviews.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
    </>
  );
}

export default CompanyReview;
