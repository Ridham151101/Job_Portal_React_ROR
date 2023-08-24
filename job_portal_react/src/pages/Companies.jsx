import { useCallback, useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import axiosInstance from "../api/axios-interceptor";
import EditCompanyModal from "../components/EditCompanyModal";
import CreateCompanyModal from "../components/CreateCompanyModal";
import { Button } from "react-bootstrap";

const Companies = () => {
  const [userCompanies, setUserCompanies] = useState([]);
  const [editCompany, setEditCompany] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchUserCompanies = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3001/api/v1/companies"
        );
        setUserCompanies(response.data.data);
      } catch (error) {
        console.error("Error fetching user companies:", error);
      }
    };

    fetchUserCompanies();
  }, []);

  const handleCreateCompanySave = async (newCompanyData) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3001/api/v1/companies",
        newCompanyData
      );

      setUserCompanies((prevCompanies) => [
        ...prevCompanies,
        response.data.data,
      ]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const handleEditCompany = useCallback((company) => {
    setEditCompany(company);
  }, []);

  const handleUpdateCompany = async (companyId, updatedData) => {
    try {
      await axiosInstance.patch(
        `http://localhost:3001/api/v1/companies/${companyId}`,
        updatedData
      );
      const updatedCompanies = userCompanies.map((c) =>
        c.id === companyId ? { ...c, ...updatedData } : c
      );
      setUserCompanies(updatedCompanies);
      setEditCompany(null);
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  const handleDeleteCompany = useCallback(
    async (company) => {
      try {
        await axiosInstance.delete(
          `http://localhost:3001/api/v1/companies/${company.id}`
        );
        const updatedCompanies = userCompanies.filter(
          (c) => c.id !== company.id
        );
        setUserCompanies(updatedCompanies);
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    },
    [userCompanies]
  );

  const handleCreateCompany = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <>
      <div className="p-8">
        <Button className="m-4" id="buttons" onClick={handleCreateCompany}>
          Create Company
        </Button>
        <div className="m-4 d-flex flex-wrap justify-content-around">
          {userCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onEdit={handleEditCompany}
              onDelete={handleDeleteCompany}
            />
          ))}
        </div>
      </div>
      {showCreateModal && (
        <CreateCompanyModal
          show={showCreateModal}
          onHide={handleCloseCreateModal}
          onSave={handleCreateCompanySave}
        />
      )}
      {editCompany && (
        <EditCompanyModal
          company={editCompany}
          show={true}
          onHide={() => setEditCompany(null)}
          onSave={(updatedData) =>
            handleUpdateCompany(editCompany.id, updatedData)
          }
        />
      )}
    </>
  );
};

export default Companies;
