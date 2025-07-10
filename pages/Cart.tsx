import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Shield,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";

export default function Cart() {
  // Sample cart items - in real app this would come from state management
  const cartItems = [
    {
      id: 1,
      name: "Maasai Beaded Necklace",
      tribe: "Maasai",
      price: 89,
      originalPrice: 120,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      artisan: "Maria Sankale",
    },
    {
      id: 2,
      name: "Turkana Woven Basket",
      tribe: "Turkana",
      price: 156,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      artisan: "James Lokwang",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Shopping Cart
                </h1>
                <Badge variant="outline" className="px-3 py-1">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                  Items
                </Badge>
              </div>

              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-6 gap-4 items-center">
                      {/* Product Image */}
                      <div className="sm:col-span-2">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-foreground truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              By {item.artisan}
                            </p>
                            <Badge className="bg-olive-green text-white text-xs mt-1">
                              {item.tribe}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center">
                        <div className="font-semibold text-foreground">
                          ${item.price}
                        </div>
                        {item.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </div>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="w-12 text-center py-2 text-sm">
                            {item.quantity}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="text-center font-semibold text-foreground">
                        ${item.price * item.quantity}
                      </div>

                      {/* Remove */}
                      <div className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex items-center justify-between pt-4">
                <Link to="/catalog">
                  <Button variant="outline" className="group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span
                        className={shipping === 0 ? "text-olive-green" : ""}
                      >
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <Button className="w-full mt-6 bg-earth-red hover:bg-earth-red/90 text-white">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    {shipping === 0 ? (
                      <p className="text-olive-green">
                        🎉 You qualify for free shipping!
                      </p>
                    ) : (
                      <p>
                        Spend ${(100 - subtotal).toFixed(2)} more for free
                        shipping
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Why Shop With Us?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-olive-green" />
                      <div>
                        <p className="font-medium text-sm">
                          Authentic Guarantee
                        </p>
                        <p className="text-xs text-muted-foreground">
                          100% authentic tribal crafts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-indigo-blue" />
                      <div>
                        <p className="font-medium text-sm">Fast Shipping</p>
                        <p className="text-xs text-muted-foreground">
                          5-7 business days worldwide
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-earth-red" />
                      <div>
                        <p className="font-medium text-sm">Secure Payment</p>
                        <p className="text-xs text-muted-foreground">
                          MPESA & PayPal protected
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Promo Code</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-border rounded-md text-sm"
                    />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Empty Cart
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Discover authentic treasures from Kenya's nomadic tribes and start
              building your collection.
            </p>
            <Link to="/catalog">
              <Button className="bg-earth-red hover:bg-earth-red/90 text-white px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
