import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Search,
  Calendar,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";

interface TrackingEvent {
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
}

interface OrderDetails {
  orderNumber: string;
  orderDate: string;
  status: "processing" | "shipped" | "delivered";
  estimatedDelivery: string;
  trackingNumber: string;
  items: Array<{
    id: number;
    name: string;
    tribe: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  total: number;
}

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderFound, setOrderFound] = useState(false);

  // Sample order data
  const sampleOrder: OrderDetails = {
    orderNumber: "NT123456",
    orderDate: "December 15, 2024",
    status: "shipped",
    estimatedDelivery: "December 22, 2024",
    trackingNumber: "KE2024120001",
    items: [
      {
        id: 1,
        name: "Maasai Beaded Necklace",
        tribe: "Maasai",
        price: 89,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 2,
        name: "Turkana Woven Basket",
        tribe: "Turkana",
        price: 156,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "Nairobi",
      country: "Kenya",
      phone: "+254 712 345 678",
    },
    paymentMethod: "M-Pesa",
    total: 245,
  };

  const trackingEvents: TrackingEvent[] = [
    {
      date: "Dec 15, 2024",
      time: "10:30 AM",
      status: "Order Placed",
      location: "Nomad Treasures, Nairobi",
      description: "Your order has been confirmed and is being prepared",
    },
    {
      date: "Dec 16, 2024",
      time: "2:15 PM",
      status: "Processing",
      location: "Artisan Workshop, Kajiado",
      description: "Items are being prepared by our artisan partners",
    },
    {
      date: "Dec 17, 2024",
      time: "9:45 AM",
      status: "Shipped",
      location: "DHL Hub, Nairobi",
      description: "Package has been picked up and is in transit",
    },
    {
      date: "Dec 18, 2024",
      time: "11:20 AM",
      status: "In Transit",
      location: "DHL Hub, Mombasa",
      description: "Package is on its way to destination",
    },
  ];

  const handleTrackOrder = () => {
    if (orderNumber.trim()) {
      setOrderFound(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-sun-yellow text-tribal-brown";
      case "shipped":
        return "bg-indigo-blue text-white";
      case "delivered":
        return "bg-olive-green text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return <CheckCircle className="h-4 w-4" />;
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "shipped":
      case "in transit":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!orderFound ? (
          // Order Search
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Package className="h-16 w-16 mx-auto mb-4 text-earth-red" />
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Track Your Order
              </h1>
              <p className="text-lg text-muted-foreground">
                Enter your order number to track your authentic tribal treasures
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Order Number
                    </label>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter order number (e.g., NT123456)"
                        className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                      />
                      <Button
                        onClick={handleTrackOrder}
                        className="bg-earth-red hover:bg-earth-red/90 text-white px-6"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">
                      Need Help Finding Your Order?
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Check your email confirmation for the order number
                      </li>
                      <li>
                        • Order numbers start with "NT" followed by 6 digits
                      </li>
                      <li>
                        • Contact us at{" "}
                        <a
                          href="mailto:orders@nomadtreasures.com"
                          className="text-earth-red hover:underline"
                        >
                          orders@nomadtreasures.com
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an order yet?{" "}
                      <Link
                        to="/catalog"
                        className="text-earth-red hover:underline"
                      >
                        Start shopping
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Order Details & Tracking
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Order Header */}
            <div className="text-center">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Order Details
              </h1>
              <p className="text-lg text-muted-foreground">
                Order #{sampleOrder.orderNumber} • Placed on{" "}
                {sampleOrder.orderDate}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Order Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Order Status</span>
                      <Badge className={getStatusColor(sampleOrder.status)}>
                        {sampleOrder.status.charAt(0).toUpperCase() +
                          sampleOrder.status.slice(1)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Tracking Number
                        </p>
                        <p className="font-semibold">
                          {sampleOrder.trackingNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Estimated Delivery
                        </p>
                        <p className="font-semibold">
                          {sampleOrder.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tracking Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {trackingEvents.map((event, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                index === 0
                                  ? "bg-earth-red text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {getStatusIcon(event.status)}
                            </div>
                            {index < trackingEvents.length - 1 && (
                              <div className="w-px h-12 bg-border mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-foreground">
                                {event.status}
                              </h4>
                              <span className="text-sm text-muted-foreground">
                                {event.date}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {event.description}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location} • {event.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 border border-border rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.tribe} Tribe • Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-semibold">
                        {sampleOrder.shippingAddress.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sampleOrder.shippingAddress.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sampleOrder.shippingAddress.city},{" "}
                        {sampleOrder.shippingAddress.country}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground pt-2">
                        <Phone className="h-3 w-3 mr-1" />
                        {sampleOrder.shippingAddress.phone}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${sampleOrder.total - 15}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>$15</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${sampleOrder.total}</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground">
                          Paid via {sampleOrder.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Help & Support */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-earth-red" />
                        <a
                          href="mailto:support@nomadtreasures.com"
                          className="text-earth-red hover:underline"
                        >
                          support@nomadtreasures.com
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-earth-red" />
                        <span>+254 700 123 456</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                      >
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Review Reminder */}
                {sampleOrder.status === "delivered" && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Star className="h-8 w-8 mx-auto mb-2 text-sun-yellow" />
                        <h4 className="font-semibold mb-2">
                          Love your treasures?
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Share your experience with others
                        </p>
                        <Button className="bg-earth-red hover:bg-earth-red/90 text-white">
                          Write a Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <Link to="/catalog">
                <Button
                  variant="outline"
                  className="border-tribal-brown text-tribal-brown"
                >
                  Continue Shopping
                </Button>
              </Link>
              <Button
                onClick={() => setOrderFound(false)}
                className="bg-earth-red hover:bg-earth-red/90 text-white"
              >
                Track Another Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
