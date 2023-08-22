import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Private({ children }) {
  const token = useSelector((state) => state.auth.token);

  if (token === null) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Private;
