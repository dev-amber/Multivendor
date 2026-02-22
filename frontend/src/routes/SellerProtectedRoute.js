import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);

  // Show loader while checking auth
  if (isLoading) return <Loader />;

  // Redirect if not seller
  if (!isSeller) return <Navigate to="/shop-login" replace />;

  // Prevent undefined shop issues
  if (!seller) return <Loader />; // or return null

  return children;
};

export default SellerProtectedRoute;
