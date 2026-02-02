import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import SearchBox from "@/components/SearchBox";
import type { ProductSearchResult } from "@/services/api";

/* ===============================
  eature List
================================ */
const features = [
  {
    icon: BarChart3,
    title: "Sentiment Classification",
    description:
      "Automatically classifies customer reviews into positive, negative, and neutral categories using NLP techniques.",
  },
  {
    icon: TrendingUp,
    title: "Trend Monitoring",
    description:
      "Analyzes sentiment trends over time to identify changes in customer satisfaction.",
  },
  {
    icon: MessageSquare,
    title: "Review Collection",
    description:
      "Collects product reviews from Amazon and Flipkart for large-scale analysis.",
  },
  {
    icon: Zap,
    title: "Efficient Processing",
    description:
      "Optimized backend system ensures fast and reliable sentiment evaluation.",
  },
  {
    icon: Shield,
    title: "Data Reliability",
    description:
      "Ensures consistency and accuracy of collected data through automated validation.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Support",
    description:
      "Supports comparative analysis across multiple e-commerce platforms.",
  },
];

/* ===============================
   Home Component
================================ */
const Home = () => {
  const navigate = useNavigate();

  const handleProductSelect = (product: ProductSearchResult) => {
    navigate("/dashboard", { state: { product } });
  };

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-chart-5/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative mx-auto px-4 py-20 md:py-32">

          <div className="max-w-4xl mx-auto text-center space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              <Zap className="h-4 w-4" />
              Engineering Project
            </div>

            {/* Heading */}
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Product Review
              <span className="text-gradient block mt-2">
                Sentiment Analysis System
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              A web-based analytical platform that evaluates customer reviews
              using Natural Language Processing techniques to understand public
              opinion on e-commerce products.
            </p>

            {/* Search Box */}
            <div
              className="pt-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <SearchBox onProductSelect={handleProductSelect} />
            </div>

            {/* Project Stats */}
            <div
              className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >

              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">
                  50,000+
                </div>
                <p className="text-sm text-muted-foreground">
                  Reviews Processed
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">
                  90%+
                </div>
                <p className="text-sm text-muted-foreground">
                  Classification Accuracy
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">
                  2
                </div>
                <p className="text-sm text-muted-foreground">
                  Supported Platforms
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">

        <div className="container mx-auto px-4">

          <div className="text-center max-w-2xl mx-auto mb-12">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              System Capabilities
            </h2>

            <p className="text-muted-foreground">
              Core functionalities implemented to support large-scale sentiment
              analysis and data-driven decision making.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >

                <CardContent className="p-6">

                  <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>

                </CardContent>

              </Card>
            ))}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">

        <div className="container mx-auto px-4">

          <Card className="gradient-hero overflow-hidden">

            <CardContent className="p-8 md:p-12 text-center text-primary-foreground">

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Access the Analysis Dashboard
              </h2>

              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Explore detailed sentiment reports, visual analytics, and
                customer feedback trends through the interactive dashboard.
              </p>

              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
                className="gap-2 font-semibold"
              >
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>

            </CardContent>

          </Card>

        </div>
      </section>

    </div>
  );
};

export default Home;
