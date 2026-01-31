"use client";

import * as React from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Globe,
  Smartphone,
  TrendingUp,
  Network,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Locale } from "@/lib/config";

interface SolutionFinderQuizProps {
  dict?: any;
  locale?: Locale;
}

interface QuizStep {
  id: number;
  title: string;
  description: string;
  options: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    value: string;
  }>;
}

const quizSteps: QuizStep[] = [
  {
    id: 1,
    title: "What are you building?",
    description: "Select the primary digital product or solution you need.",
    options: [
      {
        id: "web",
        label: "Web App",
        icon: <Globe className="h-6 w-6" />,
        value: "web-application",
      },
      {
        id: "mobile",
        label: "Mobile App",
        icon: <Smartphone className="h-6 w-6" />,
        value: "mobile-application",
      },
      {
        id: "marketing",
        label: "Marketing Platform",
        icon: <TrendingUp className="h-6 w-6" />,
        value: "marketing-platform",
      },
      {
        id: "infrastructure",
        label: "IT Infrastructure",
        icon: <Network className="h-6 w-6" />,
        value: "it-infrastructure",
      },
    ],
  },
  {
    id: 2,
    title: "What's your timeline?",
    description: "How soon do you need the solution completed?",
    options: [
      {
        id: "urgent",
        label: "ASAP (1-2 months)",
        icon: <span className="text-2xl font-bold">⚡</span>,
        value: "urgent",
      },
      {
        id: "soon",
        label: "Soon (2-6 months)",
        icon: <span className="text-2xl font-bold">📅</span>,
        value: "soon",
      },
      {
        id: "planned",
        label: "Planned (6-12 months)",
        icon: <span className="text-2xl font-bold">📍</span>,
        value: "planned",
      },
      {
        id: "flexible",
        label: "Flexible timeline",
        icon: <span className="text-2xl font-bold">🎯</span>,
        value: "flexible",
      },
    ],
  },
  {
    id: 3,
    title: "What outcome matters most?",
    description: "What's your primary business objective?",
    options: [
      {
        id: "growth",
        label: "Revenue Growth",
        icon: <TrendingUp className="h-6 w-6" />,
        value: "revenue-growth",
      },
      {
        id: "security",
        label: "Security & Compliance",
        icon: <Badge className="h-6 w-6" />,
        value: "security-compliance",
      },
      {
        id: "efficiency",
        label: "Operational Efficiency",
        icon: <Network className="h-6 w-6" />,
        value: "efficiency",
      },
      {
        id: "speed",
        label: "Time-to-Market Speed",
        icon: <ChevronRight className="h-6 w-6" />,
        value: "speed",
      },
    ],
  },
];

interface QuizAnswers {
  [key: string]: string;
}

interface Recommendation {
  title: string;
  description: string;
  services: string[];
  icon: React.ReactNode;
}

const getRecommendation = (answers: QuizAnswers): Recommendation => {
  const buildType = answers.step1;
  const timeline = answers.step2;
  const outcome = answers.step3;

  if (buildType === "web-application") {
    return {
      title: "Custom Web Application Development",
      description:
        "We'll build a high-performance, scalable web app tailored to your business needs with modern tech stack.",
      services: [
        "Next.js + React Development",
        "Database & Backend API",
        "UI/UX Design",
        "Deployment & Optimization",
      ],
      icon: <Globe className="h-8 w-8 text-accent" />,
    };
  }

  if (buildType === "mobile-application") {
    return {
      title: "Cross-Platform Mobile App",
      description:
        "Native or cross-platform apps for iOS and Android built with the latest frameworks and best practices.",
      services: [
        "iOS & Android Development",
        "Backend Integration",
        "App Store Deployment",
        "Ongoing Maintenance",
      ],
      icon: <Smartphone className="h-8 w-8 text-accent" />,
    };
  }

  if (buildType === "marketing-platform") {
    return {
      title: "Digital Marketing Solution",
      description:
        "SEO, content marketing, paid ads, and conversion optimization to drive sustainable growth.",
      services: [
        "SEO Strategy & Implementation",
        "Content Marketing",
        "Paid Advertising",
        "Analytics & Reporting",
      ],
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
    };
  }

  return {
    title: "IT Infrastructure & Cloud Solutions",
    description:
      "Scalable, secure cloud infrastructure and managed IT services for your growing business.",
    services: [
      "Cloud Migration",
      "Infrastructure Design",
      "Security & Monitoring",
      "24/7 Managed Support",
    ],
    icon: <Network className="h-8 w-8 text-accent" />,
  };
};

export function SolutionFinderQuiz({
  dict,
  locale = "en",
}: SolutionFinderQuizProps) {
  const quiz = dict?.quiz || {};
  const [currentStep, setCurrentStep] = React.useState(1);
  const [answers, setAnswers] = React.useState<QuizAnswers>({});
  const [showRecommendation, setShowRecommendation] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const currentQuestion = quizSteps.find((step) => step.id === currentStep);
  const isAnswered = answers[`step${currentStep}`];
  const recommendation = getRecommendation(answers as QuizAnswers);

  const handleAnswer = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`step${currentStep}`]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quiz-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step1: answers.step1,
          step2: answers.step2,
          step3: answers.step3,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }

      setShowRecommendation(true);
    } catch (error) {
      console.error("[v0] Quiz submission failed:", error);
      // Still show recommendation even if submission fails
      setShowRecommendation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAnswers({});
    setShowRecommendation(false);
  };

  return (
    <Section background="muted">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!showRecommendation ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <SectionHeader
                badge={`${quiz.step || "Step"} ${currentStep} ${quiz.of || "of"} ${quizSteps.length}`}
                title={currentQuestion?.title || ""}
                description={currentQuestion?.description || ""}
              />

              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  {quizSteps.map((step) => (
                    <div
                      key={step.id}
                      className={cn(
                        "h-2 flex-1 rounded-full transition-all duration-300",
                        step.id <= currentStep
                          ? "bg-accent shadow-sm shadow-accent/30"
                          : "bg-muted",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                {currentQuestion?.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className="text-left w-full"
                  >
                    <Card
                      className={cn(
                        "group h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-accent glass-card-enhanced",
                        answers[`step${currentStep}`] === option.id &&
                          "border-accent border-2 bg-accent/10 shadow-md",
                      )}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-lg transition-colors flex-shrink-0",
                              answers[`step${currentStep}`] === option.id
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted text-foreground group-hover:bg-accent group-hover:text-accent-foreground",
                            )}
                          >
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm sm:text-base">
                              {option.label}
                            </h4>
                            {answers[`step${currentStep}`] === option.id && (
                              <CheckCircle2 className="h-4 w-4 text-accent mt-2" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  {quiz.back || "Back"}
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered || isSubmitting}
                  className="min-w-[150px]"
                >
                  {currentStep === quizSteps.length
                    ? quiz.getRecommendation || "Get Recommendation"
                    : quiz.next || "Next"}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {quiz.recommendedSolution || "Recommended Solution"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {quiz.recommendedSolutionDesc ||
                    "Based on your answers, here's what we recommend for your project."}
                </p>
              </div>

              <Card className="glass-card-enhanced mb-8">
                <CardContent className="pt-8">
                  <div className="flex gap-6 mb-6">
                    <div className="hidden sm:flex">{recommendation.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {recommendation.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {recommendation.description}
                      </p>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          {quiz.whatsIncluded || "What's included:"}
                        </h4>
                        <ul className="space-y-2">
                          {recommendation.services.map((service, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                              <span className="text-foreground">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleReset} variant="outline">
                  {quiz.startOver || "Start Over"}
                </Button>
                <Button asChild className="btn-cta">
                  <a href={`/${locale}/contact?recommended=true`}>
                    {quiz.getQuoteForProject || "Get a Quote for This Project"}
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
