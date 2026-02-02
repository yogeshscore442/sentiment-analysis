import {
  Code2,
  Database,
  Server,
  BarChart3,
  Cloud,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ===============================
   Tech Stack Data
================================ */
const techStack = {
  frontend: [
    { name: "React.js", description: "UI Library" },
    { name: "TypeScript", description: "Type Safety" },
    { name: "Tailwind CSS", description: "Styling" },
    { name: "Recharts", description: "Data Visualization" },
    { name: "React Router", description: "Navigation" },
    { name: "Axios", description: "HTTP Client" },
  ],

  backend: [
    { name: "Python Flask", description: "API Server" },
    { name: "Selenium", description: "Web Scraping" },
    { name: "BeautifulSoup", description: "HTML Parsing" },
    { name: "TextBlob", description: "Sentiment Analysis" },
    { name: "VADER", description: "Sentiment Scoring" },
  ],

  database: [
    { name: "MongoDB", description: "Primary Database" },
    { name: "PostgreSQL", description: "Alternative DB" },
    { name: "Redis", description: "Caching Layer" },
  ],

  deployment: [
    { name: "Vercel", description: "Frontend Hosting" },
    { name: "Docker", description: "Containerization" },
    { name: "Nginx", description: "Reverse Proxy" },
  ],
};

/* ===============================
   About Component
================================ */
const About = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 gradient-hero border-0">
            Academic Project
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Product Sentiment Analyzer
          </h1>

          <p className="text-lg text-muted-foreground">
            A comprehensive review analysis platform that uses Natural
            Language Processing to extract insights from e-commerce reviews.
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Project Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This system analyzes reviews from Amazon and Flipkart to
              understand real customer sentiment and behavior.
            </p>

            <ul className="space-y-2 text-muted-foreground">
              <li>• Real-time sentiment classification</li>
              <li>• Trend analysis over time</li>
              <li>• Word frequency visualization</li>
              <li>• Interactive filtering dashboard</li>
            </ul>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">

          {/* Frontend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-5 w-5 text-primary" />
                Frontend
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map((tech) => (
                  <Badge key={tech.name} variant="secondary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Backend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Server className="h-5 w-5 text-positive" />
                Backend & NLP
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map((tech) => (
                  <Badge key={tech.name} variant="secondary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Database */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-5 w-5 text-neutral" />
                Database
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.database.map((tech) => (
                  <Badge key={tech.name} variant="secondary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deployment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Cloud className="h-5 w-5 text-chart-5" />
                Deployment
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.deployment.map((tech) => (
                  <Badge key={tech.name} variant="secondary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Architecture */}
        <Card className="mb-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              System Architecture
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="bg-muted rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">
{`Frontend (React) → API (Flask) → Database (MongoDB/Postgres)
Scraper → NLP Engine → REST API → Dashboard`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Contact & Links</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-4">

              {/* Change these links to YOUR real ones */}
              <a
                href="https://github.com/yogeshscore442/sentiment-insights-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/yogesh-m-s-544374294"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>

              <a
                href="mailto:yourmail@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
              >
                <Mail className="h-5 w-5" />
                Email
              </a>

            </div>
          </CardContent>
        </Card>

        <Separator className="my-12 max-w-4xl mx-auto" />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 25 Product Sentiment Analyzer.</p>
          <p className="mt-1">Built with React & TypeScript</p>
        </div>

      </div>
    </div>
  );
};

export default About;
