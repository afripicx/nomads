import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Activity,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  LogOut,
  BarChart3,
  PieChart,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiClient } from "@/lib/api";

interface DashboardStats {
  total_customers: number;
  total_suppliers: number;
  total_products: number;
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
  pending_products: number;
}

interface RecentOrder {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await apiClient.getAdminDashboard();
      setStats(response.stats);
      setRecentOrders(response.recent_orders || []);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      // If unauthorized, redirect to login
      if (error instanceof Error && error.message.includes("401")) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiClient.clearToken();
    navigate("/admin/login");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: "bg-sun-yellow", text: "text-tribal-brown" },
      processing: { bg: "bg-indigo-blue", text: "text-white" },
      shipped: { bg: "bg-olive-green", text: "text-white" },
      delivered: { bg: "bg-olive-green", text: "text-white" },
      cancelled: { bg: "bg-earth-red", text: "text-white" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      bg: "bg-muted",
      text: "text-muted-foreground",
    };

    return (
      <Badge className={`${config.bg} ${config.text} border-0`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-red mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-earth-red flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NT</span>
                </div>
                <span className="font-display font-bold text-xl text-foreground">
                  Admin Portal
                </span>
              </Link>
              <Badge className="bg-olive-green text-white">Super Admin</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-earth-red hover:bg-earth-red/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Manage your Nomad Treasures eCommerce platform
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Customers
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.total_customers.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-blue" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Active Products
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.total_products.toLocaleString()}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-olive-green" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.total_orders.toLocaleString()}
                    </p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-earth-red" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(stats.total_revenue)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-sun-yellow" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Pending Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Pending Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-sun-yellow/10 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">
                          Pending Orders
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Require processing
                        </p>
                      </div>
                      <Badge className="bg-sun-yellow text-tribal-brown">
                        {stats?.pending_orders || 0}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-olive-green/10 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">
                          Pending Products
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Awaiting approval
                        </p>
                      </div>
                      <Badge className="bg-olive-green text-white">
                        {stats?.pending_products || 0}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-earth-red hover:bg-earth-red/90 text-white">
                      <Package className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                    <Button
                      variant="outline"
                      className="border-olive-green text-olive-green hover:bg-olive-green hover:text-white"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button
                      variant="outline"
                      className="border-indigo-blue text-indigo-blue hover:bg-indigo-blue hover:text-white"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                    <Button
                      variant="outline"
                      className="border-tribal-brown text-tribal-brown hover:bg-tribal-brown hover:text-white"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Order
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Customer
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Payment
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-foreground">
                                {order.order_number}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(
                                  order.created_at,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-foreground">
                                {order.customer_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {order.customer_email}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-foreground">
                            {formatCurrency(order.total_amount)}
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(order.status)}
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(order.payment_status)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Product Management
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Manage products, approve supplier submissions, and update
                    inventory.
                  </p>
                  <Button className="bg-earth-red hover:bg-earth-red/90 text-white">
                    Manage Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground mb-2">
                    User Management
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    View and manage customer accounts, permissions, and user
                    data.
                  </p>
                  <Button className="bg-indigo-blue hover:bg-indigo-blue/90 text-white">
                    Manage Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Supplier Management
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Approve suppliers, manage verification, and track supplier
                    performance.
                  </p>
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white">
                    Manage Suppliers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
