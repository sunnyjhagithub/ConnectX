
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import RoleBasedDashboard from "@/components/dashboard/RoleBasedDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    // Set page title with role information
    document.title = `${userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} ` : ''}Dashboard | ConnectX`;
  }, [userRole]);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <RoleBasedDashboard />
      </div>
    </Layout>
  );
};

export default Dashboard;
