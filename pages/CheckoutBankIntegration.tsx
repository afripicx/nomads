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
  Copy,
  Check,
  Building2,
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
import { apiClient } from "@/lib/api";

type Currency = "USD" | "KES";
type PaymentMethod = "bank_transfer" | "mpesa" | "paypal";

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

interface BankDetails {
  bank_name: string;
  paybill: string;
  account_number: string;
  account_name: string;
  amount: number;
  currency: string;
  reference: string;
}

export default function CheckoutBankIntegration() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("bank_transfer");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const exchangeRate = 129;

  // Sample cart items
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

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleBankPayment = async () => {
    setIsProcessing(true);

    try {
      // Create order first
      const orderData = {
        user_id: 1, // In real app, get from auth context
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        shipping_address: shippingInfo,
        payment_method: "bank_transfer",
        currency: currency,
      };

      const orderResponse = await apiClient.createOrder(orderData);

      if (orderResponse.success) {
        // Process bank payment
        const paymentResponse = await apiClient.processPayment({
          order_id: orderResponse.order.id,
          payment_method: "bank_transfer",
          amount: convertPrice(total),
          currency: currency,
        });

        if (paymentResponse.success && paymentResponse.bank_details) {
          setBankDetails(paymentResponse.bank_details);
          setCurrentStep(4); // Show bank details step
        }
      }
    } catch (error) {
      console.error("Bank payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentConfirmation = () => {
    setOrderComplete(true);
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
              Payment Instructions Sent!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Please complete your payment using the bank details provided. Your
              order will be confirmed once payment is received.
            </p>
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
            {[1, 2, 3, 4].map((step) => (
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
                  {step === 1
                    ? "Shipping"
                    : step === 2
                      ? "Payment"
                      : step === 3
                        ? "Review"
                        : "Bank Details"}
                </span>
                {step < 4 && <div className="w-8 h-px bg-muted mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 4: Bank Payment Details */}
            {currentStep === 4 && bankDetails && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-olive-green">
                    <Building2 className="h-5 w-5 mr-2" />
                    Bank Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-olive-green/10 p-4 rounded-lg border border-olive-green/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-olive-green" />
                      <span className="font-semibold text-olive-green">
                        Payment Instructions
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Please use the following details to complete your payment.
                      Your order will be processed once payment is confirmed.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Bank Name */}
                    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Bank Name
                        </p>
                        <p className="font-semibold text-foreground">
                          {bankDetails.bank_name}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(bankDetails.bank_name, "bank_name")
                        }
                      >
                        {copiedField === "bank_name" ? (
                          <Check className="h-4 w-4 text-olive-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Paybill */}
                    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Paybill Number
                        </p>
                        <p className="font-semibold text-foreground text-lg">
                          {bankDetails.paybill}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(bankDetails.paybill, "paybill")
                        }
                      >
                        {copiedField === "paybill" ? (
                          <Check className="h-4 w-4 text-olive-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Account Number */}
                    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Account Number
                        </p>
                        <p className="font-semibold text-foreground text-lg">
                          {bankDetails.account_number}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            bankDetails.account_number,
                            "account_number",
                          )
                        }
                      >
                        {copiedField === "account_number" ? (
                          <Check className="h-4 w-4 text-olive-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Account Name */}
                    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Account Name
                        </p>
                        <p className="font-semibold text-foreground">
                          {bankDetails.account_name}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            bankDetails.account_name,
                            "account_name",
                          )
                        }
                      >
                        {copiedField === "account_name" ? (
                          <Check className="h-4 w-4 text-olive-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center justify-between p-4 bg-earth-red/10 rounded-lg border border-earth-red/20">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Amount to Pay
                        </p>
                        <p className="font-bold text-earth-red text-2xl">
                          {currency === "KES"
                            ? `KSh ${bankDetails.amount.toLocaleString()}`
                            : `$${bankDetails.amount}`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            bankDetails.amount.toString(),
                            "amount",
                          )
                        }
                      >
                        {copiedField === "amount" ? (
                          <Check className="h-4 w-4 text-olive-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Reference */}
                    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Payment Reference
                        </p>
                        <p className="font-semibold text-foreground">
                          {bankDetails.reference}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(bankDetails.reference, "reference")
                        }
                      >
                        {copiedField === "reference" ? (
                          <Check className="h-4 w-4 text-olive-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-indigo-blue/10 p-4 rounded-lg border border-indigo-blue/20">
                    <h4 className="font-semibold text-indigo-blue mb-2">
                      Payment Instructions:
                    </h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Go to your bank or M-Pesa app</li>
                      <li>Select "Pay Bill" or "Lipa na M-Pesa"</li>
                      <li>
                        Enter Paybill: <strong>247247</strong>
                      </li>
                      <li>
                        Enter Account: <strong>0748261019</strong>
                      </li>
                      <li>
                        Enter Amount:{" "}
                        <strong>
                          {currency === "KES"
                            ? `KSh ${bankDetails.amount.toLocaleString()}`
                            : `$${bankDetails.amount}`}
                        </strong>
                      </li>
                      <li>
                        Reference: <strong>{bankDetails.reference}</strong>
                      </li>
                      <li>Complete the transaction</li>
                    </ol>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1"
                    >
                      Back to Review
                    </Button>
                    <Button
                      onClick={handlePaymentConfirmation}
                      className="flex-1 bg-olive-green hover:bg-olive-green/90 text-white"
                    >
                      I've Completed Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

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
                  {/* Form fields - same as before */}
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
                    {/* Bank Transfer Option */}
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem
                        value="bank_transfer"
                        id="bank_transfer"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="bank_transfer"
                          className="font-medium text-foreground cursor-pointer"
                        >
                          Bank Transfer / M-Pesa Paybill
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay using Equity Bank Paybill (Recommended for Kenya)
                        </p>
                      </div>
                      <Badge className="bg-olive-green text-white">
                        🇰🇪 Preferred
                      </Badge>
                    </div>

                    {/* M-Pesa API Option (Disabled for now) */}
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg opacity-50">
                      <RadioGroupItem
                        value="mpesa"
                        id="mpesa"
                        className="mt-1"
                        disabled
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="mpesa"
                          className="font-medium text-foreground cursor-pointer"
                        >
                          M-Pesa STK Push
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Direct M-Pesa payment (Coming Soon)
                        </p>
                      </div>
                      <Badge className="bg-muted text-muted-foreground">
                        Coming Soon
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
                          Pay securely with PayPal (International)
                        </p>
                      </div>
                      <Badge className="bg-indigo-blue text-white">
                        🌍 Global
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
                        {paymentMethod === "bank_transfer"
                          ? "Bank Transfer / M-Pesa Paybill"
                          : paymentMethod === "paypal"
                            ? "PayPal"
                            : "M-Pesa STK Push"}
                      </p>
                      {paymentMethod === "bank_transfer" && (
                        <p className="text-sm text-muted-foreground">
                          Equity Bank Paybill: 247247
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
                      onClick={handleBankPayment}
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

          {/* Order Summary Sidebar - Same as before */}
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

            {/* Bank Details Preview */}
            {paymentMethod === "bank_transfer" && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Payment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Bank:</span>
                      <span className="font-medium">Equity Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paybill:</span>
                      <span className="font-medium">247247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account:</span>
                      <span className="font-medium">0748261019</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
