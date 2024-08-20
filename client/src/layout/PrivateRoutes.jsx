import LoadingPage from "../components/LoadingPage";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const auth = useSelector(({ auth }) => auth);
  if (auth.loading) {
    return <LoadingPage />;
  }
  if (auth.profile && auth.profile?._id) {
    return <Outlet />;
  }
  if (!auth.profile?._id) {
    return <Navigate to="/log-in" />;
  }
};

export default PrivateRoutes;
