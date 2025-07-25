import API from "@/api/axios";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(false);

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
    <div>
      <h1>Dashboard</h1>
      <div className="">{JSON.stringify(user)}</div>
    </div>
  );
};

export default DashboardPage;
