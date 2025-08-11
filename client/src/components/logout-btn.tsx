import API from "@/api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/auth/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      console.log("🚀 ~ handleLogout ~ error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      type="submit"
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline"
      className="text-red-100 font-semibold border-red-500 bg-red-300/70 hover:bg-red-300/70"
    >
      {isLoading ? "Loading..." : "Log out"}
    </Button>
  );
};

export default LogoutBtn;
