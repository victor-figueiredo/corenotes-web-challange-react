import { useContext } from "react";
import { AuthContext } from "./context/auth";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { MyContextProvider } from "./context/notes";

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MyContextProvider>
      <Outlet />
    </MyContextProvider>
  );
};

const Routes = () => {
  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Router>
  );
};

export default Routes;
