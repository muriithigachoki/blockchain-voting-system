import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/layout";
import RegisterVoters from "../pages/AuthPages/RegisterVoters";
import HomePage from "../pages/HomePage";
import PresidentialGrid from "../components/Presidetials/PresidetialGrid";
import LoginPage from "../pages/AuthPages/LoginPage";
import GovernorGrid from "../components/governor/GovernorGrid";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register", element: <RegisterVoters /> },
      { path: "presidentials", element: <PresidentialGrid /> },
      { path: "governor", element: <GovernorGrid /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

export default router;
