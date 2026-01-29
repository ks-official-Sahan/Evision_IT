import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section"; // Import Section
import { Container } from "@/components/ui/container"; // Import Container
import { Breadcrumbs } from "@/components/ui/breadcrumbs"; // Import Breadcrumbs
import { MetricStrip } from "@/components/ui/metric-strip"; // Import MetricStrip
import { Metadata } from "next"; // Import Metadata
import { redirect } from "next/navigation";
import { Target, Eye, Heart, Users, Lightbulb, Shield, ArrowRight, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Learn about Evision's mission, vision, values, and the team behind our success in digital transformation.",
  openGraph: {
    title: "About Us | Evision",
    description:
      "Learn about Evision's mission, vision, values, and the team behind our success in digital transformation.",
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work closely with clients as partners, ensuring transparency and shared success.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We maintain the highest ethical standards in all our business practices.",
  },
  {
    icon: Heart,
    title: "Excellence",
    description:
      "We're committed to delivering exceptional quality in everything we do.",
  },
];

const milestones = [
  { year: "2017", event: "Evision founded in Colombo" },
  { year: "2019", event: "Expanded to 20+ team members" },
  { year: "2021", event: "100th project milestone" },
  { year: "2023", event: "Launched managed IT services" },
  { year: "2025", event: "Serving 50+ active clients globally" },
];

const metrics = [
  { value: "8+", label: "Years in Business" },
  { value: "200+", label: "Projects Completed" },
  { value: "50+", label: "Active Clients" },
  { value: "25+", label: "Team Members" },
];

const teamMembers = [
  // Sample team members data
  { name: "John Doe", role: "CEO", bio: "John is the CEO of Evision.", linkedin: "https://linkedin.com/in/johndoe" },
  { name: "Jane Smith", role: "CTO", bio: "Jane is the CTO of Evision.", linkedin: "https://linkedin.com/in/janesmith" },
  // Add more team members as needed
];

export default function CompanyPageDeprecated() {
  redirect("/en/company");
}

export function CompanyPage() {
  return (
    <>
      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs items={[{ label: "Company", href: "/company" }]} />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              About Us
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Crafting Digital Excellence Since 2017
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              We&apos;re a team of passionate technologists dedicated to helping
              businesses thrive in the digital age through innovative solutions
              and exceptional service.
            </p>
          </div>
        </Container>
      </Section>

      {/* Metrics */}
      <Section padding="sm">
        <MetricStrip metrics={metrics} />
      </Section>

      {/* Vision & Mission */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-accent/30 bg-accent/5">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Eye className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4 text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted technology partner for growing businesses
                in Sri Lanka and beyond, known for delivering transformative
                digital solutions that drive measurable success.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground">
                <Target className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4 text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with innovative technology solutions,
                exceptional service, and strategic guidance that enables them to
                achieve their goals and stay ahead in an ever-evolving digital
                landscape.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Our Story */}
      <Section background="muted">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              Our Story
            </Badge>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              From startup to trusted partner
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Founded in 2017 by a group of technology enthusiasts in Colombo,
              Evision started with a simple belief: every business deserves
              access to world-class technology solutions, regardless of size.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              What began as a small web development agency has grown into a
              full-spectrum IT services company serving clients across Sri Lanka
              and internationally. Today, we combine deep technical expertise
              with a genuine commitment to our clients&apos; success.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border my-2" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-foreground">{milestone.year}</p>
                  <p className="text-muted-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Our Values
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            What drives us
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title} className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-foreground">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section background="muted">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Our Team
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Meet the people behind Evision
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="pt-8 pb-6">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="text-lg">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-accent">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {member.bio}
                </p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm text-muted-foreground hover:text-accent"
                  >
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="primary" className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to work with us?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Let&apos;s discuss how we can help your business grow.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
