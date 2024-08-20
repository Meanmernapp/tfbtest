import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Admin from "./pages/Admin.jsx";
import AccountAdmin from "./pages/AccountAdmin.jsx";
import PrivateRoutes from "./layout/PrivateRoutes.jsx";

import Error404 from "./pages/Error404.jsx";
import UploadAudio from "./pages/UploadAudio.jsx";
import UploadCities from "./pages/UploadCities.jsx";

import CreateCampaign from "./pages/CreateCampaign.jsx";

import Profile from "./pages/Profile.jsx";
import Header from "./components/Header.jsx";
import AdminRoutes from "./layout/AdminRoutes.jsx";
import Analytics from "./pages/Analytics.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "./store/authSlice.js";
import FAQ from "./pages/FAQ.jsx";
import Policies from "./pages/Policies.jsx";
import Policy from "./pages/Policy.jsx";
import TermsOfService from "./pages/Terms.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="" element={<Home />} />

            <Route path="log-in" element={<LogIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="faq" element={<FAQ />} />
            <Route
              path="policies"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route path="" element={<Policies />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="privacy-policy" element={<Policy />} />
            </Route>
            <Route path="admin" element={<AdminRoutes />}>
              <Route path="" element={<Admin />} />
              <Route path="analytics/:id" element={<Analytics />} />
              <Route path="accounts" element={<AccountAdmin />} />

              <Route path="cities/:campaign_id" element={<UploadCities />} />
              <Route path="upload/:campaign_id" element={<UploadAudio />} />
              <Route path="create" element={<CreateCampaign />} />
              <Route path="edit/:id" element={<CreateCampaign />} />
            </Route>
            <Route path="profile" element={<PrivateRoutes />}>
              <Route index element={<Profile />} />
            </Route>
          </Route>
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
