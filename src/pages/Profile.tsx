
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProfileView from "@/components/profile/ProfileView";

const Profile = () => {
  useEffect(() => {
    // Set page title
    document.title = "Profile | ConnectX";
  }, []);
  
  return (
    <Layout>
      <ProfileView />
    </Layout>
  );
};

export default Profile;
