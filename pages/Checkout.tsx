import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Phone,
  MapPin,
  User,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  Truck,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";

type Currency = "USD" | "KES";
type PaymentMethod = "paypal" | "mpesa" | "card";

interface CartItem {
  id: number;
  name: string;
  tribe: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface MpesaDetails {
  phoneNumber: string;
  transactionId?: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  const exchangeRate = 129;

  // Sample cart items (in real app, this would come from context/state)
  const cartItems: CartItem[] = [
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
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Kenya",
  });

  const [mpesaDetails, setMpesaDetails] = useState<MpesaDetails>({
    phoneNumber: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  // Price calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const convertPrice = (priceUSD: number): number => {
    return currency === "USD" ? priceUSD : Math.round(priceUSD * exchangeRate);
  };

  const formatPrice = (priceUSD: number): string => {
    const convertedPrice = convertPrice(priceUSD);
    return currency === "USD"
      ? `$${convertedPrice}`
      : `KSh ${convertedPrice.toLocaleString()}`;
  };

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleMpesaPayment = async () => {
    setIsProcessing(true);

    // Simulate M-Pesa STK Push
    try {
      // In real implementation, this would call your backend API
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setMpesaDetails((prev) => ({
        ...prev,
        transactionId: `MPX${Date.now()}`,
      }));

      setOrderComplete(true);
    } catch (error) {
      console.error("M-Pesa payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate PayPal payment
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOrderComplete(true);
    } catch (error) {
      console.error("PayPal payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate card payment
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setOrderComplete(true);
    } catch (error) {
      console.error("Card payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const validateShipping = () => {
    return (
      shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.email &&
      shippingInfo.phone &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.country
    );
  };

  const countries = [
    "Kenya",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Burundi",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "South Africa",
  ];

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-olive-green rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Asante! Order Confirmed
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your order has been successfully placed. You'll receive a
              confirmation email shortly.
            </p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <span className="font-semibold">
                      #NT{Date.now().toString().slice(-6)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold">
                      {paymentMethod === "mpesa"
                        ? "M-Pesa"
                        : paymentMethod === "paypal"
                          ? "PayPal"
                          : "Credit Card"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                  {mpesaDetails.transactionId && (
                    <div className="flex justify-between">
                      <span>M-Pesa Transaction ID:</span>
                      <span className="font-semibold">
                        {mpesaDetails.transactionId}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button className="bg-earth-red hover:bg-earth-red/90 text-white">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="outline">Track Your Order</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/cart" className="hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1 inline" />
            Back to Cart
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step
                      ? "bg-earth-red text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    currentStep >= step
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step === 1 ? "Shipping" : step === 2 ? "Payment" : "Review"}
                </span>
                {step < 3 && <div className="w-8 h-px bg-muted mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        State/County
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                        placeholder="Enter state/county"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Country *
                    </label>
                    <Select
                      value={shippingInfo.country}
                      onValueChange={(value) =>
                        handleInputChange("country", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={saveInfo}
                      onCheckedChange={(checked) =>
                        setSaveInfo(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="saveInfo"
                      className="text-sm text-muted-foreground"
                    >
                      Save this information for next time
                    </label>
                  </div>

                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!validateShipping()}
                    className="w-full bg-earth-red hover:bg-earth-red/90 text-white"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) =>
                      setPaymentMethod(value as PaymentMethod)
                    }
                  >
                    {/* M-Pesa Option */}
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem
                        value="mpesa"
                        id="mpesa"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="mpesa"
                          className="font-medium text-foreground cursor-pointer"
                        >
                          M-Pesa (Recommended for Kenya)
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay securely using your M-Pesa mobile money account
                        </p>
                        {paymentMethod === "mpesa" && (
                          <div className="mt-4 space-y-3">
                            <div>
                              <label className="text-sm font-medium text-foreground mb-2 block">
                                M-Pesa Phone Number
                              </label>
                              <input
                                type="tel"
                                value={mpesaDetails.phoneNumber}
                                onChange={(e) =>
                                  setMpesaDetails((prev) => ({
                                    ...prev,
                                    phoneNumber: e.target.value,
                                  }))
                                }
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                                placeholder="+254 7XX XXX XXX"
                              />
                            </div>
                            <div className="bg-olive-green/10 p-3 rounded-lg">
                              <p className="text-sm text-olive-green">
                                💡 You'll receive an STK push notification on
                                your phone to complete the payment
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <Badge className="bg-olive-green text-white">
                        🇰🇪 Local
                      </Badge>
                    </div>

                    {/* PayPal Option */}
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem
                        value="paypal"
                        id="paypal"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="paypal"
                          className="font-medium text-foreground cursor-pointer"
                        >
                          PayPal
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay securely with your PayPal account or credit card
                        </p>
                      </div>
                      <Badge className="bg-indigo-blue text-white">
                        🌍 Global
                      </Badge>
                    </div>

                    {/* Credit Card Option */}
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="card" id="card" className="mt-1" />
                      <div className="flex-1">
                        <label
                          htmlFor="card"
                          className="font-medium text-foreground cursor-pointer"
                        >
                          Credit/Debit Card
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Visa, Mastercard, American Express
                        </p>
                        {paymentMethod === "card" && (
                          <div className="mt-4 space-y-3">
                            <div>
                              <label className="text-sm font-medium text-foreground mb-2 block">
                                Card Number
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                                placeholder="1234 5678 9012 3456"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth-red"
                                  placeholder="123"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <Badge className="bg-earth-red text-white">
                        🔒 Secure
                      </Badge>
                    </div>
                  </RadioGroup>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) =>
                        setAgreeToTerms(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-earth-red hover:underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-earth-red hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back to Shipping
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      disabled={!agreeToTerms}
                      className="flex-1 bg-earth-red hover:bg-earth-red/90 text-white"
                    >
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">
                      Order Items
                    </h4>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground">
                              {item.name}
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              {item.tribe} • Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">
                      Shipping Address
                    </h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-medium">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {shippingInfo.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {shippingInfo.city}, {shippingInfo.state}{" "}
                        {shippingInfo.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {shippingInfo.country}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {shippingInfo.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">
                      Payment Method
                    </h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-medium">
                        {paymentMethod === "mpesa"
                          ? "M-Pesa Mobile Payment"
                          : paymentMethod === "paypal"
                            ? "PayPal"
                            : "Credit/Debit Card"}
                      </p>
                      {paymentMethod === "mpesa" && (
                        <p className="text-sm text-muted-foreground">
                          {mpesaDetails.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                    >
                      Back to Payment
                    </Button>
                    <Button
                      onClick={() => {
                        if (paymentMethod === "mpesa") {
                          handleMpesaPayment();
                        } else if (paymentMethod === "paypal") {
                          handlePayPalPayment();
                        } else {
                          handleCardPayment();
                        }
                      }}
                      disabled={isProcessing}
                      className="flex-1 bg-earth-red hover:bg-earth-red/90 text-white"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        `Place Order ${formatPrice(total)}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Currency Selector */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Currency:
                  </span>
                  <Select
                    value={currency}
                    onValueChange={(value: Currency) => setCurrency(value)}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">🇺🇸 USD</SelectItem>
                      <SelectItem value="KES">🇰🇪 KES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  1 USD ≈ {exchangeRate} KES
                </p>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-olive-green" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                {shipping === 0 && (
                  <div className="bg-olive-green/10 p-3 rounded-lg">
                    <p className="text-sm text-olive-green">
                      🎉 Free shipping applied!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Secure Checkout</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-olive-green" />
                    <span className="text-sm">SSL Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-olive-green" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-olive-green" />
                    <span className="text-sm">Money-back Guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
