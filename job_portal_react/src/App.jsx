import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import "./App.css";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Private from "./utils/PrivateRoute";
import Navigationbar from "./components/Navigationbar";
import UserProfile from "./pages/UserProfile";
import Companies from "./pages/Companies";
import AllCompanies from "./pages/AllCompanies";
import JobSeekerJobs from "./pages/JobSeekerJobs";
import DetailedCompanyCard from "./components/DetailedCompanyCard";
import Jobs from "./pages/Jobs";
import DetailedJobCard from "./components/DetailedJobCard";
import DisplayJobApplications from "./pages/DisplayJobApplications";
import JobSeekerJobApplicationsTable from "./pages/JobSeekerJobApplicationsTable";
import Portfolio from "./pages/Portfolio";
import CompanyReview from "./pages/CompanyReview";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token);
  const currUserRole = useSelector((state) => state.auth.currUser.role);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currUser"));
    const token = localStorage.getItem("token");
    // console.log("after get token:", token);

    if (user && token) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      });
    }
  }, []);

  // console.log("isLoggedIn: ", isLoggedIn !== null);

  return (
    <>
      <ToastContainer theme="colored" />
      <BrowserRouter>
        {isLoggedIn !== null && <Navigationbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route element={<Private />}>
            <Route element={<UserProfile />} path="/profile" />
            <Route
              element={
                currUserRole === "admin" ? <AllCompanies /> : <Companies />
              }
              path="/companies"
            />
            <Route
              element={<DetailedCompanyCard />}
              path="/companies/:companyId"
            />
            <Route element={<Jobs />} path="/companies/:companyId/jobs" />
            <Route
              element={<DetailedJobCard />}
              path="/companies/:companyId/jobs/:jobId"
            />
            <Route
              element={<DisplayJobApplications />}
              path="/companies/:companyId/jobs/:jobId/job_applicants"
            />
            <Route element={<JobSeekerJobs />} path="/jobSeekerJobs" />
            <Route
              element={<JobSeekerJobApplicationsTable />}
              path="/job_applications"
            />
            <Route element={<Portfolio />} path="/portfolios" />
            <Route
              element={<CompanyReview />}
              path="/companies/:companyId/reviews"
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
