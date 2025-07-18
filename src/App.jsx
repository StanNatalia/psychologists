import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute.jsx";

const HomePage = lazy(() => import("./pages/HomePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const PsychologistsPage = lazy(() => import("./pages/PsychologistsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.backgroundLocation;

  const handleBackDropClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      navigate(-1);
    }
  };

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/favorites"
            element={<PrivateRoute element={<FavoritesPage />} />}
          />
          <Route
            path="/psychologists"
            element={<PrivateRoute element={<PsychologistsPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/registration"
              element={
                <div className="backdrop" onClick={handleBackDropClick}>
                  <RegistrationPage onClose={() => navigate(-1)} />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="backdrop" onClick={handleBackDropClick}>
                  <LoginPage onClose={() => navigate(-1)} />
                </div>
              }
            />
          </Routes>
        )}
      </Suspense>
    </>
  );
}

export default App;
