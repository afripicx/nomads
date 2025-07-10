import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiClient.login(formData.email, formData.password);

      if (response.user?.role === "admin") {
        setSuccess("Login successful! Redirecting to admin dashboard...");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        setError("Access denied. Admin privileges required.");
        apiClient.clearToken(); // Clear any token if not admin
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tribal-brown via-earth-red to-tribal-brown flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4EBD0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-sahara-sand rounded-full flex items-center justify-center shadow-lg">
            <Shield className="h-10 w-10 text-earth-red" />
          </div>
          <h1 className="font-display text-3xl font-bold text-sahara-sand mb-2">
            Admin Portal
          </h1>
          <p className="text-sahara-sand/80">
            Secure access to Nomad Treasures administration
          </p>
          <Badge className="bg-olive-green text-white mt-2">
            🔒 Super Admin Access
          </Badge>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-display text-2xl text-tribal-brown">
              Sign In
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Enter your admin credentials to continue
            </p>
          </CardHeader>

          <CardContent>
            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-destructive text-sm">{error}</span>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="mb-4 p-3 bg-olive-green/10 border border-olive-green/20 rounded-lg flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-olive-green" />
                <span className="text-olive-green text-sm">{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Admin Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red focus:border-transparent"
                    placeholder="admin@nomadtreasures.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-earth-red hover:bg-earth-red/90 text-white py-3 font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In to Admin Portal"
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-3">
              <Link
                to="/admin/forgot-password"
                className="text-sm text-earth-red hover:underline"
              >
                Forgot your password?
              </Link>

              <div className="border-t border-border pt-4">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to Nomad Treasures
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-sahara-sand mt-0.5" />
            <div>
              <h4 className="font-semibold text-sahara-sand text-sm">
                Security Notice
              </h4>
              <p className="text-sahara-sand/80 text-xs mt-1">
                This is a secure admin portal. All login attempts are logged and
                monitored. Only authorized personnel should access this system.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials (Remove in production) */}
        <div className="mt-4 p-3 bg-indigo-blue/20 rounded-lg border border-indigo-blue/30">
          <h4 className="font-semibold text-indigo-blue text-sm mb-2">
            Demo Credentials:
          </h4>
          <div className="space-y-1 text-xs">
            <p className="text-indigo-blue">
              <strong>Email:</strong> admin@nomadtreasures.com
            </p>
            <p className="text-indigo-blue">
              <strong>Password:</strong> admin123
            </p>
            <p className="text-indigo-blue/80 text-xs italic">
              (Change these in production)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
