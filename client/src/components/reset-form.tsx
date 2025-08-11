import API from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function ResetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/auth/reset-password", { email });

      if (res.data.success) {
        toast.success(res.data.message);
        setShowResetPassword(true);
      } else {
        toast.error(res.data.message);
      }

      setIsLoading(false);
    } catch (error: any) {
      console.log("🚀 ~ handleReset ~ error:", error);

      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleReset = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/auth/verify-password-reset", {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }

      setIsLoading(false);
    } catch (error: any) {
      console.log("🚀 ~ handleReset ~ error:", error);

      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Reset your password with your Email{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showResetPassword ? (
            <form className="space-y-3">
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={value => setOtp(value)}
                      required
                      id="otp"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />

                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">New Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      onChange={e => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                  </div>

                  <Button
                    type="submit"
                                className="bg-indigo-500 hover:bg-indigo-600 font-semibold transition"

                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Reset"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            <form>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    onClick={handleSendOTP}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Send OTP"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
