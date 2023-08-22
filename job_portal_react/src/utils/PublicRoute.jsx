import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Public({ children }) {
  const token = useSelector((state) => state.auth.token);

  // console.log("isAuthenticated: ", token !== null);

  if (token !== null) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
export default Public;
