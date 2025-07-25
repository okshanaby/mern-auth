import API from "@/api/axios";
import LogoutBtn from "@/components/logout-btn";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await API.get("/user/profile");

        if (res.data && res.data.data) {
          setUser(res.data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-48 space-y-10">
      <h1>Dashboard</h1>
      <div className="">{JSON.stringify(user)}</div>
      <div className="flex gap-3">
        {!user.isAccountVerified ? (
          <Button onClick={() => navigate("/verify-account")}>
            Verify Account
          </Button>
        ) : null}
        <LogoutBtn />
      </div>
    </div>
  );
};

export default DashboardPage;
