import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = useSelector((state) => state.user.token);
  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
