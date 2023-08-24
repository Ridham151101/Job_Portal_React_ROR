import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Public({ children, currUserRole }) {
  const token = useSelector((state) => state.auth.token);

  // console.log("isAuthenticated: ", token !== null);

  if (token !== null) {
    if (currUserRole === "admin" || currUserRole === "job_creator") {
      return <Navigate to="/companies" replace />;
    } else {
      <Navigate to="jobSeekerJobs" replace />;
    }
  }
  return children;
}
export default Public;
