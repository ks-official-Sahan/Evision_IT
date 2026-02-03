"use client";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import type { Locale } from "@/lib/config";
import { motion, Variants } from "framer-motion";
import {
  Target,
  Eye,
  Sparkles,
  Heart,
  Shield,
  Lightbulb,
  Award,
  Users,
  Clock,
  Building2,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";

interface CompanyClientProps {
  locale: Locale;
  dict: any;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CompanyClient({ locale, dict }: CompanyClientProps) {
  const stats = [
    { value: "100+", label: "Projects Delivered", icon: CheckCircle2 },
    { value: "30+", label: "Active Clients", icon: Users },
    { value: "2+", label: "Years Experience", icon: Clock },
    { value: "99.9%", label: "Uptime SLA", icon: Zap },
  ];

  const values = [
    {
      icon: Lightbulb,
      label: dict.company.value1,
      desc: dict.company.value1Desc,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Award,
      label: dict.company.value2,
      desc: dict.company.value2Desc,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Heart,
      label: dict.company.value3,
      desc: dict.company.value3Desc,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
  ];

  return (
    <>
      {/* Sr-only SEO content */}
      <div className="sr-only">
        <h1>About Evision IT - IT Services Company in Sri Lanka</h1>
        <p>
          Evision IT is a leading IT services and digital transformation company
          based in Nugegoda, Sri Lanka. We provide web development, mobile app
          development, e-commerce solutions, digital marketing, cloud services,
          and cybersecurity solutions for businesses in Sri Lanka and globally.
          With over 100 projects delivered and 30+ active clients, we are
          committed to innovation, excellence, and building trust through
          technology.
        </p>
      </div>

      {/* Hero Section */}
      <Section padding="lg" className="relative overflow-hidden pt-24 md:pt-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
        <div className="absolute top-20 right-0 -mr-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10"
          >
            <motion.div variants={itemVariants}>
              <Breadcrumbs
                items={[
                  { label: dict.company.title, href: `/${locale}/company` },
                ]}
                locale={locale}
                className="mb-8"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 border-accent/30 bg-accent/5 text-accent animate-fade-in"
              >
                <Building2 className="w-4 h-4 mr-2" />
                {dict.company.title}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                <span className="text-foreground">
                  {dict.company.subtitle.split(" ").slice(0, 2).join(" ")}{" "}
                </span>
                <span className="text-gradient-accent">
                  {dict.company.subtitle.split(" ").slice(2).join(" ")}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                Transforming businesses through innovative technology solutions.
                We combine technical expertise with a passion for excellence to
                deliver digital products that drive growth.
              </p>
            </motion.div>

            {/* Stats Strip */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/40 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <stat.icon className="h-5 w-5 text-accent" />
                    <span className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Mission & Vision Section */}
      <Section>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid gap-8 lg:grid-cols-2"
          >
            {/* Mission Card */}
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/40 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <Target className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {dict.company.mission}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {dict.company.missionStatement}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision Card */}
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/40 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Eye className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {dict.company.vision}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {dict.company.visionStatement}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Core Values Section */}
      <Section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/30 via-muted/50 to-muted/30" />

        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-4 px-4 py-2 border-accent/30 bg-accent/5 text-accent"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Core Principles
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {dict.company.values}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision we make and every
                solution we deliver.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="h-full bg-card/70 backdrop-blur-sm border-border/50 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${value.bgColor} ${value.color} mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <value.icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        {value.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-4 px-4 py-2 border-accent/30 bg-accent/5 text-accent"
              >
                <Shield className="w-4 h-4 mr-2" />
                Why Evision IT
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                Your Trusted Technology Partner
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine deep technical expertise with a commitment to your
                success.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Globe,
                    title: "Global Reach",
                    desc: "Serving clients across Sri Lanka, UAE, and beyond",
                  },
                  {
                    icon: Shield,
                    title: "Security First",
                    desc: "Enterprise-grade security in every solution",
                  },
                  {
                    icon: Zap,
                    title: "Fast Delivery",
                    desc: "Agile methodology for rapid time-to-market",
                  },
                  {
                    icon: Users,
                    title: "24/7 Support",
                    desc: "Dedicated support whenever you need us",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
