import { useAuth } from "../hooks/use-auth.js";
import { Navigate } from "react-router-dom";

const FavoritesPage = () => {
  const { isAuth, email } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <h1>Hello</h1>
    </>
  );
};

export default FavoritesPage;
