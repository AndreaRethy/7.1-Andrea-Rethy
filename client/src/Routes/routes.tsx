import MainPage from '../pages/MainPage';
import App from '../App';
import LoginPage from "../pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import RegisterPage from '../pages/RegisterPage';
import SettingsPage from '../pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
    children: [
      {
        path: "/",
        element: <LoginPage />,
        errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
      },
      {
        path: "register",
        element: <RegisterPage />,
        errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
      },
      {
        path: "home",
        element: <MainPage />,
        errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
      },
      {
        path: "profile",
        element: <SettingsPage />,
        errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
      },
    ],
  },
]);
