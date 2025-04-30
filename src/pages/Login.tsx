
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Set page title
    document.title = "Sign In | ConnectX";
  }, []);

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
