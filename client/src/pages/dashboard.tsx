import API from "@/api/axios";
import LogoutBtn from "@/components/logout-btn";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await API.get("/user/profile");
        setUser(res.data?.data || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  async function handleVerification() {
    setVerificationLoading(true);

    try {
      const res = await API.post("/auth/send-otp");

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify-account");
      } else {
        toast.error(res.data.message);
      }

      setVerificationLoading(false);
    } catch (error: any) {
      console.log("🚀 ~ onSubmit ~ error:", error);

      toast.error(error.message);

      setVerificationLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-indigo-400 hover:text-indigo-300 transition font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold mb-8">
          Welcome,{" "}
          <span className="text-indigo-400">{user?.name || "User"}</span>
        </h1>

        {/* Profile Card */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 mb-10">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-2 text-gray-300">
            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-medium">Account Status:</span>{" "}
              {user?.isAccountVerified ? (
                <span className="text-green-400">Verified</span>
              ) : (
                <span className="text-yellow-400">Not Verified</span>
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          {!user?.isAccountVerified && (
            <Button
              onClick={handleVerification}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              disabled={verificationLoading}
            >
              {verificationLoading ? "Loading" : " Verify Account"}
            </Button>
          )}
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
