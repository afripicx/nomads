import { Link } from "react-router-dom";
import { useState } from "react";
import { Star, MapPin, Heart, ShoppingBag, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";

type Currency = "USD" | "KES";

export default function Index() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const exchangeRate = 129;

  const convertPrice = (priceUSD: number): number => {
    return currency === "USD" ? priceUSD : Math.round(priceUSD * exchangeRate);
  };

  const formatPrice = (priceUSD: number): string => {
    const convertedPrice = convertPrice(priceUSD);
    return currency === "USD"
      ? `$${convertedPrice}`
      : `KSh ${convertedPrice.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sahara-sand to-background">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23A62929" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
          }
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-olive-green text-white px-3 py-1">
                  Authentic Nomadic Heritage
                </Badge>
                <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Treasures from Kenya's{" "}
                  <span className="text-earth-red">Nomadic Tribes</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Discover authentic handcrafted artifacts from the Turkana,
                  Samburu, Rendile, Maasai, Borana, and Somali communities. Each
                  piece tells a story of heritage, artistry, and cultural pride.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/catalog">
                  <Button
                    size="lg"
                    className="bg-earth-red hover:bg-earth-red/90 text-white px-8 w-full sm:w-auto"
                  >
                    Explore Collections
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-tribal-brown text-tribal-brown hover:bg-tribal-brown hover:text-white w-full sm:w-auto"
                  >
                    Learn Our Story
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators & Currency Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 fill-sun-yellow text-sun-yellow" />
                    <span>4.9/5 from 500+ reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-olive-green" />
                    <span>Direct from Kenya</span>
                  </div>
                </div>

                {/* Currency Selector */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">
                      Currency:
                    </span>
                    <Select
                      value={currency}
                      onValueChange={(value: Currency) => setCurrency(value)}
                    >
                      <SelectTrigger className="w-[90px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">🇺🇸 USD</SelectItem>
                        <SelectItem value="KES">🇰🇪 KES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-tribal-brown to-earth-red overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Maasai artisan creating traditional jewelry"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="font-display font-semibold text-tribal-brown">
                      Featured Artisan
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Maria Lokwang, Turkana Community
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-sun-yellow text-tribal-brown rounded-full p-3 shadow-lg">
                <span className="font-bold text-sm">Free Shipping</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-olive-green text-white rounded-full p-3 shadow-lg">
                <span className="font-bold text-sm">Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tribal Heritage Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Six Nomadic Traditions, One Marketplace
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each tribe brings unique artistry and cultural significance to
              their craft. Explore the rich heritage behind every treasure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                tribe: "Maasai",
                specialty: "Beadwork & Jewelry",
                image:
                  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "bg-earth-red",
              },
              {
                tribe: "Turkana",
                specialty: "Woven Baskets",
                image:
                  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "bg-olive-green",
              },
              {
                tribe: "Samburu",
                specialty: "Traditional Clothing",
                image:
                  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "bg-indigo-blue",
              },
              {
                tribe: "Rendile",
                specialty: "Carved Artifacts",
                image:
                  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "bg-tribal-brown",
              },
              {
                tribe: "Borana",
                specialty: "Musical Instruments",
                image:
                  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "bg-sun-yellow",
              },
              {
                tribe: "Somali",
                specialty: "Home Décor",
                image:
                  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "bg-olive-green",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.tribe} ${item.specialty}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div
                      className={`absolute top-4 left-4 ${item.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                    >
                      {item.tribe}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display font-bold text-white text-lg mb-1">
                        {item.specialty}
                      </h3>
                      <p className="text-white/80 text-sm">
                        Authentic handcrafted pieces
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Treasures
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked authentic pieces from our artisan partners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maasai Beaded Necklace",
                tribe: "Maasai",
                price: 89,
                originalPrice: 120,
                image:
                  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                rating: 4.8,
                isNew: true,
              },
              {
                name: "Turkana Woven Basket",
                tribe: "Turkana",
                price: 156,
                image:
                  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                rating: 4.9,
                isNew: false,
              },
              {
                name: "Samburu Traditional Shuka",
                tribe: "Samburu",
                price: 203,
                image:
                  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                rating: 4.7,
                isNew: false,
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.isNew && (
                        <Badge className="bg-sun-yellow text-tribal-brown">
                          New
                        </Badge>
                      )}
                      <Badge className="bg-olive-green text-white">
                        {product.tribe}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 backdrop-blur-sm hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    {product.originalPrice && (
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-earth-red text-white">
                          Save{" "}
                          {formatPrice(product.originalPrice - product.price)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-sun-yellow fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({product.rating})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg text-foreground">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-earth-red hover:bg-earth-red/90 text-white"
                      >
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button
                size="lg"
                className="bg-earth-red hover:bg-earth-red/90 text-white px-8"
              >
                View All Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tribal-brown text-sahara-sand py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-earth-red flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NT</span>
                </div>
                <span className="font-display font-bold text-xl">
                  Nomad Treasures
                </span>
              </Link>
              <p className="text-sahara-sand/80 text-sm">
                Authentic handcrafted treasures from Kenya's nomadic tribes,
                delivered worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Collections</h4>
              <ul className="space-y-2 text-sm text-sahara-sand/80">
                <li>
                  <Link
                    to="/catalog"
                    className="hover:text-white transition-colors"
                  >
                    Jewelry
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="hover:text-white transition-colors"
                  >
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="hover:text-white transition-colors"
                  >
                    Home Décor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="hover:text-white transition-colors"
                  >
                    Baskets
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-sahara-sand/80">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="hover:text-white transition-colors"
                  >
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-sahara-sand/80">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Newsletter
                  </Link>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sahara-sand/20 mt-12 pt-8 text-center text-sm text-sahara-sand/60">
            <p>
              &copy; 2025 Nomad Treasures. All rights reserved. Supporting
              Kenyan artisan communities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
