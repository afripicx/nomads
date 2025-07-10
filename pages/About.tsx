import { Link } from "react-router-dom";
import {
  Heart,
  Globe,
  Shield,
  Truck,
  Users,
  Star,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

export default function About() {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-earth-red" />,
      title: "Authentic Heritage",
      description:
        "Every piece in our collection is genuinely crafted by traditional artisans using techniques passed down through generations.",
    },
    {
      icon: <Shield className="h-8 w-8 text-olive-green" />,
      title: "Fair Trade",
      description:
        "We ensure artisans receive fair compensation for their work, supporting sustainable livelihoods in nomadic communities.",
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-blue" />,
      title: "Global Impact",
      description:
        "Connecting global customers with local artisans, preserving cultural traditions while expanding economic opportunities.",
    },
    {
      icon: <Users className="h-8 w-8 text-sun-yellow" />,
      title: "Community First",
      description:
        "We work directly with tribal communities, ensuring our partnerships benefit the entire community, not just individuals.",
    },
  ];

  const stats = [
    { number: "500+", label: "Artisan Partners" },
    { number: "6", label: "Tribal Communities" },
    { number: "50+", label: "Countries Served" },
    { number: "10,000+", label: "Happy Customers" },
  ];

  const team = [
    {
      name: "Sarah Kimani",
      role: "Founder & Cultural Director",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b743?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description:
        "Born and raised in Kenya, Sarah has spent over 15 years working with nomadic communities, building trust and establishing ethical partnerships.",
    },
    {
      name: "James Lokwang",
      role: "Community Liaison Manager",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description:
        "A Turkana community leader who bridges traditional customs with modern e-commerce, ensuring authentic representation of tribal crafts.",
    },
    {
      name: "Maria Rodriguez",
      role: "Global Operations Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description:
        "With expertise in international trade and logistics, Maria ensures our global customers receive authentic products efficiently and sustainably.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sahara-sand to-background py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-earth-red text-white px-4 py-2 mb-6">
                  Our Story
                </Badge>
                <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
                  Preserving Heritage,{" "}
                  <span className="text-earth-red">Empowering Communities</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2019, Nomad Treasures was born from a simple
                  belief: that traditional craftsmanship deserves a global
                  stage, and artisan communities deserve fair compensation for
                  their incredible work.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/catalog">
                  <Button className="bg-earth-red hover:bg-earth-red/90 text-white px-8">
                    Shop Our Collections
                  </Button>
                </Link>
                <Link to="/tribes">
                  <Button
                    variant="outline"
                    className="border-tribal-brown text-tribal-brown hover:bg-tribal-brown hover:text-white"
                  >
                    Meet Our Artisans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Artisan crafting traditional jewelry"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              To create a sustainable bridge between traditional artisans and
              global markets, preserving cultural heritage while providing
              economic opportunities for nomadic communities across Kenya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="font-display font-semibold text-xl mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Together, we're making a difference
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold text-earth-red mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals dedicated to preserving cultural heritage
              and empowering artisan communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-xl mb-1">
                      {member.name}
                    </h3>
                    <p className="text-earth-red font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              How We Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our ethical approach ensures authenticity, quality, and fair
              compensation at every step
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-earth-red rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">
                Partner with Communities
              </h3>
              <p className="text-muted-foreground">
                We build long-term relationships with tribal communities,
                respecting their traditions and ensuring fair representation.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-olive-green rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">
                Ensure Authenticity
              </h3>
              <p className="text-muted-foreground">
                Every piece is verified for authenticity and crafted using
                traditional techniques by skilled artisans.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-indigo-blue rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">
                Direct to You
              </h3>
              <p className="text-muted-foreground">
                We handle global logistics while maintaining the personal touch
                and story behind each handcrafted piece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Johnson",
                location: "New York, USA",
                rating: 5,
                review:
                  "The Maasai necklace I ordered is absolutely stunning. You can feel the craftsmanship and cultural significance in every bead. It's become my favorite piece of jewelry.",
              },
              {
                name: "Carlos Rodriguez",
                location: "Madrid, Spain",
                rating: 5,
                review:
                  "Amazing quality and fast shipping! The Turkana basket is beautifully made and came with a card explaining its cultural significance. Highly recommend!",
              },
              {
                name: "Aisha Patel",
                location: "London, UK",
                rating: 5,
                review:
                  "I love that my purchase supports artisan communities. The Samburu textile is gorgeous and the story behind it makes it even more special.",
              },
            ].map((review, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-sun-yellow fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{review.review}"
                  </p>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {review.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-tribal-brown text-sahara-sand py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg text-sahara-sand/80 max-w-2xl mx-auto mb-8">
            Every purchase helps preserve cultural traditions and supports
            artisan families. Become part of our global community of culture
            enthusiasts and conscious consumers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button
                size="lg"
                className="bg-earth-red hover:bg-earth-red/90 text-white"
              >
                Start Shopping
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-sahara-sand text-sahara-sand hover:bg-sahara-sand hover:text-tribal-brown"
            >
              Join Our Newsletter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
