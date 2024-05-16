import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useRoutes, useNavigate } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import Header from "./components/Header";
import CircularProgress from "@mui/material/CircularProgress";

const App: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }else{
      setLoading(false);
      navigate('/login');
    }
  }, [user]);  

  const routing = useRoutes(
    routesConfig.map(({ path, element }) => ({
      path,
      element: element,
    }))
  );

  return (
    <AuthProvider>
      <Header />
      {loading ? (
        <CircularProgress />
      ) : (
        routing
      )}
    </AuthProvider>
  );
};

export default App;
