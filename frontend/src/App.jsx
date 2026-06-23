import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import AuthLoading from "./components/AuthLoading/AuthLoading";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SocialFeed from "./pages/SocialFeed/SocialFeed";
import { navigationRoutes } from "./routes/navigationRoutes";

function AppRoutes() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoading />;
  }

  return (
    <Routes>
      <Route element={<AppLayout routes={navigationRoutes} />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route
          path="login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="feed"
          element={
            <ProtectedRoute>
              <SocialFeed />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
