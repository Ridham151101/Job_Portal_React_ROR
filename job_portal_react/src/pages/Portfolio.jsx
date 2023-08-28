import { useEffect, useState } from "react";
import axiosInstance from "../api/axios-interceptor";
import { Button, Table } from "react-bootstrap";
import CreatePortfolioModal from "../components/CreatePortfolioModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "../styles/Portfolio.css";
import EditPortfolioModal from "../components/EditPortfolioModal";

function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/portfolios");
      setPortfolios(response.data.data);
      // console.log("portfolio response:", response.data.data);
    } catch (error) {
      console.error("Error fetching Portfolios:", error);
    }
  };

  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
  };

  const handleEditModalOpen = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedPortfolio(null);
    setShowEditModal(false);
  };

  const handleCreatePortfolio = async (formData) => {
    try {
      const response = await axiosInstance.post("/api/v1/portfolios", formData);
      // setPortfolios((prevPortfolios) => [
      //   ...prevPortfolios,
      //   response.data.data,
      // ]);
      await fetchPortfolios();
      handleCreateModalClose();
    } catch (error) {
      console.error("Error creating portfolio:", error);
    }
  };

  const handleEditPortfolio = async (updatedData, portfolioId) => {
    try {
      await axiosInstance.patch(
        `/api/v1/portfolios/${portfolioId}`,
        updatedData
      );
      // const updatedPortfolios = portfolios.map((p) =>
      //   p.id === portfolioId ? { ...p, ...updatedData } : p
      // );
      // setPortfolios(updatedPortfolios);
      await fetchPortfolios();
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating portfolio:", error);
    }
  };

  const handleDeletePortfolio = async (portfolioId) => {
    try {
      await axiosInstance.delete(`/api/v1/portfolios/${portfolioId}`);
      // const updatedPortfolios = portfolios.filter((p) => p.id !== portfolioId);
      // setPortfolios(updatedPortfolios);
      await fetchPortfolios();
      toast.success("Portfolio Deleted Successfully.");
    } catch (error) {
      console.log("error in delete Portfolio: ", error);
    }
  };

  const truncateUrl = (url, maxLength) => {
    return url.length > maxLength
      ? url.substring(0, maxLength - 3) + "..."
      : url;
  };

  const openLinkdin = (portfolio_linkdin_url) => {
    window.open(portfolio_linkdin_url, "_blank");
  };

  return (
    <>
      <Button className="m-4" id="buttons" onClick={handleCreateModalOpen}>
        Create Portfolio
      </Button>
      <div className="container mt-4">
        <h2>Your Portfolios</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>About</th>
              <th>Experience</th>
              <th>Skills</th>
              <th>Education</th>
              <th>Linkdin Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio) => (
              <tr key={portfolio.id}>
                <td>{portfolio.title}</td>
                <td>{portfolio.about_user}</td>
                <td>{portfolio.experience}</td>
                <td>{portfolio.skills}</td>
                <td>{portfolio.education}</td>
                <td>
                  <span
                    onClick={() => openLinkdin(portfolio.linkdin_url)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {truncateUrl(portfolio.linkdin_url, 25)}
                  </span>
                </td>
                <td className="icons">
                  <EditIcon
                    className="edit-icon"
                    style={{ cursor: "pointer", color: "green" }}
                    onClick={() => handleEditModalOpen(portfolio)}
                  />
                  <DeleteIcon
                    className="delete-icon"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDeletePortfolio(portfolio.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <CreatePortfolioModal
        show={showCreateModal}
        onHide={handleCreateModalClose}
        onSubmit={handleCreatePortfolio}
      />
      {showEditModal && (
        <EditPortfolioModal
          show={showEditModal}
          onHide={handleEditModalClose}
          portfolio={selectedPortfolio}
          onSubmit={handleEditPortfolio}
        />
      )}
    </>
  );
}

export default Portfolio;
