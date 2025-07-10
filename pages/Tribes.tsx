import { Link } from "react-router-dom";
import { MapPin, Users, Calendar, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

export default function Tribes() {
  const tribes = [
    {
      name: "Maasai",
      population: "1.2 million",
      region: "Southern Kenya & Northern Tanzania",
      specialty: "Beadwork & Jewelry",
      description:
        "The Maasai are renowned for their distinctive customs, vibrant dress, and intricate beadwork. Their jewelry and ornaments carry deep cultural significance, with each color and pattern telling a story of age, status, and tribal identity.",
      traditions: [
        "Intricate beaded jewelry with symbolic colors",
        "Traditional red shuka (clothing)",
        "Ceremonial dance and warrior traditions",
        "Cattle herding heritage",
      ],
      craftHighlights: [
        "Colorful beaded necklaces and bracelets",
        "Traditional Maasai shields and spears",
        "Leather sandals and accessories",
        "Ceremonial headpieces",
      ],
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-earth-red",
    },
    {
      name: "Turkana",
      population: "1.5 million",
      region: "Northwestern Kenya",
      specialty: "Woven Baskets & Pottery",
      description:
        "The Turkana people are master weavers and potters, creating functional art from natural materials. Their baskets are not just containers but symbols of community, family, and cultural preservation.",
      traditions: [
        "Traditional basket weaving techniques",
        "Clay pottery and water vessels",
        "Fishing and livestock practices",
        "Oral storytelling traditions",
      ],
      craftHighlights: [
        "Sisal and palm leaf baskets",
        "Traditional clay pots and vessels",
        "Fishing tools and nets",
        "Ceremonial gourds",
      ],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-olive-green",
    },
    {
      name: "Samburu",
      population: "310,000",
      region: "North-Central Kenya",
      specialty: "Traditional Clothing & Textiles",
      description:
        "Close relatives of the Maasai, the Samburu maintain their distinct cultural identity through traditional clothing, elaborate ceremonies, and colorful textiles that reflect their pastoral heritage.",
      traditions: [
        "Colorful traditional clothing and wraps",
        "Age-set ceremonies and rituals",
        "Traditional dancing and singing",
        "Cattle and camel herding",
      ],
      craftHighlights: [
        "Hand-woven traditional fabrics",
        "Beaded ornaments and accessories",
        "Leather goods and bags",
        "Traditional musical instruments",
      ],
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-indigo-blue",
    },
    {
      name: "Rendile",
      population: "60,000",
      region: "Northern Kenya",
      specialty: "Carved Artifacts & Tools",
      description:
        "The Rendile people are skilled artisans known for their intricate wood carvings and traditional tools. Their craftsmanship reflects a deep connection to their desert environment and nomadic lifestyle.",
      traditions: [
        "Wood carving and tool making",
        "Camel herding traditions",
        "Desert survival skills",
        "Traditional architecture",
      ],
      craftHighlights: [
        "Carved wooden bowls and utensils",
        "Traditional camel bells",
        "Decorative walking sticks",
        "Ceremonial artifacts",
      ],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-tribal-brown",
    },
    {
      name: "Borana",
      population: "500,000",
      region: "Northern Kenya & Southern Ethiopia",
      specialty: "Musical Instruments & Ceremonial Items",
      description:
        "The Borana people have a rich musical heritage, creating traditional instruments that accompany their ceremonies and daily life. Their crafts often incorporate elements of their complex calendar system and cultural practices.",
      traditions: [
        "Traditional music and instruments",
        "Complex calendar system (Gada)",
        "Cattle blessing ceremonies",
        "Coffee culture and rituals",
      ],
      craftHighlights: [
        "Traditional drums and percussion",
        "Ceremonial staffs and symbols",
        "Coffee ceremony accessories",
        "Ritual and spiritual artifacts",
      ],
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-sun-yellow text-tribal-brown",
    },
    {
      name: "Somali",
      population: "2.8 million",
      region: "Northeastern Kenya",
      specialty: "Home Décor & Textiles",
      description:
        "Somali artisans are renowned for their beautiful textiles, incense burners, and home décor items. Their Islamic heritage blends with traditional African aesthetics to create unique and meaningful pieces.",
      traditions: [
        "Traditional textile weaving",
        "Incense and perfume making",
        "Poetry and oral literature",
        "Trading and commerce",
      ],
      craftHighlights: [
        "Woven mats and carpets",
        "Traditional incense burners",
        "Decorative containers",
        "Embroidered textiles",
      ],
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-olive-green",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sahara-sand to-background py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-olive-green text-white px-4 py-2 mb-6">
              Cultural Heritage
            </Badge>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Six Nomadic <span className="text-earth-red">Tribes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the rich heritage, traditions, and artistry of Kenya's
              nomadic communities. Each tribe brings unique skills, stories, and
              cultural treasures that have been passed down through generations.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-earth-red" />
                <span>6+ Million People</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-olive-green" />
                <span>Across Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-indigo-blue" />
                <span>Centuries of Tradition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tribes Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {tribes.map((tribe, index) => (
              <div
                key={tribe.name}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={tribe.image}
                      alt={`${tribe.name} artisan at work`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div
                      className={`absolute top-6 left-6 ${tribe.color} px-4 py-2 rounded-full`}
                    >
                      <span className="font-semibold text-sm text-white">
                        {tribe.name} Tribe
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                        {tribe.name}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{tribe.population}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{tribe.region}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Palette className="h-4 w-4" />
                          <span>{tribe.specialty}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {tribe.description}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          Cultural Traditions
                        </h4>
                        <ul className="space-y-2">
                          {tribe.traditions.map((tradition, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start"
                            >
                              <span className="text-earth-red mr-2">•</span>
                              {tradition}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          Craft Highlights
                        </h4>
                        <ul className="space-y-2">
                          {tribe.craftHighlights.map((craft, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start"
                            >
                              <span className="text-olive-green mr-2">•</span>
                              {craft}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link to="/catalog">
                      <Button className="bg-earth-red hover:bg-earth-red/90 text-white group">
                        Shop {tribe.name} Crafts
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-tribal-brown text-sahara-sand py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
            Support Artisan Communities
          </h2>
          <p className="text-lg text-sahara-sand/80 max-w-2xl mx-auto mb-8">
            Every purchase directly supports these amazing communities, helping
            preserve their traditions while providing sustainable income for
            artisan families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button
                size="lg"
                className="bg-earth-red hover:bg-earth-red/90 text-white"
              >
                Explore All Collections
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-sahara-sand text-sahara-sand hover:bg-sahara-sand hover:text-tribal-brown"
              >
                Learn More About Our Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
