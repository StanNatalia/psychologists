import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectToken } from "../redux/user/userSelectors";

const PrivateRoute = ({ element }) => {
  const token = useSelector(selectToken);
  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
