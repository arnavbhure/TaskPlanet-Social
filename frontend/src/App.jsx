import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SocialFeed from "./pages/SocialFeed/SocialFeed";
import { navigationRoutes } from "./routes/navigationRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout routes={navigationRoutes} />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Navigate to="/" replace />} />
          <Route path="signup" element={<Signup />} />
          <Route path="feed" element={<SocialFeed />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
