import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import Root from "./Root.jsx";
import App from "./App.jsx";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LinkToQR from "./pages/LinkToQR/LinkToQR.jsx";
import UrlShortner from "./pages/UrlShortner/UrlShortner.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<LandingPage />} />
      <Route path="link-to-qr" element={<LinkToQR />} />
      <Route path="url-shortner" element={<UrlShortner />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
