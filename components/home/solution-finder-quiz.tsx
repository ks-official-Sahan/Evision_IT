"use client";

import * as React from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Globe,
  Smartphone,
  TrendingUp,
  Network,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
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
    description: string;
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
        label: "Web Application",
        description: "Custom web apps, portals, dashboards",
        icon: <Globe className="h-7 w-7" />,
        value: "web-application",
      },
      {
        id: "mobile",
        label: "Mobile App",
        description: "iOS, Android, or cross-platform",
        icon: <Smartphone className="h-7 w-7" />,
        value: "mobile-application",
      },
      {
        id: "marketing",
        label: "Marketing Platform",
        description: "SEO, content, paid advertising",
        icon: <TrendingUp className="h-7 w-7" />,
        value: "marketing-platform",
      },
      {
        id: "infrastructure",
        label: "IT Infrastructure",
        description: "Cloud, security, managed services",
        icon: <Network className="h-7 w-7" />,
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
        label: "ASAP",
        description: "1-2 months",
        icon: <Zap className="h-7 w-7" />,
        value: "urgent",
      },
      {
        id: "soon",
        label: "Soon",
        description: "2-6 months",
        icon: <ArrowRight className="h-7 w-7" />,
        value: "soon",
      },
      {
        id: "planned",
        label: "Planned",
        description: "6-12 months",
        icon: <TrendingUp className="h-7 w-7" />,
        value: "planned",
      },
      {
        id: "flexible",
        label: "Flexible",
        description: "No fixed deadline",
        icon: <RotateCcw className="h-7 w-7" />,
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
        description: "Increase sales & conversions",
        icon: <TrendingUp className="h-7 w-7" />,
        value: "revenue-growth",
      },
      {
        id: "security",
        label: "Security & Compliance",
        description: "Protect data & meet regulations",
        icon: <Shield className="h-7 w-7" />,
        value: "security-compliance",
      },
      {
        id: "efficiency",
        label: "Operational Efficiency",
        description: "Streamline workflows & reduce costs",
        icon: <Network className="h-7 w-7" />,
        value: "efficiency",
      },
      {
        id: "speed",
        label: "Time-to-Market",
        description: "Launch faster than competitors",
        icon: <Zap className="h-7 w-7" />,
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

  if (buildType === "web") {
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
      icon: <Globe className="h-10 w-10 text-accent" />,
    };
  }

  if (buildType === "mobile") {
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
      icon: <Smartphone className="h-10 w-10 text-accent" />,
    };
  }

  if (buildType === "marketing") {
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
      icon: <TrendingUp className="h-10 w-10 text-accent" />,
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
    icon: <Network className="h-10 w-10 text-accent" />,
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step1: answers.step1,
          step2: answers.step2,
          step3: answers.step3,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit quiz");
      setShowRecommendation(true);
    } catch (error) {
      console.error("[v0] Quiz submission failed:", error);
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
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badge={quiz.badge || "Interactive Quiz"}
          title={quiz.title || "Find Your Perfect Solution"}
          description={
            quiz.description ||
            "Answer 3 quick questions and we'll recommend the ideal solution for your business."
          }
        />

        <AnimatePresence mode="wait">
          {!showRecommendation ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Stepper with Numbered Circles */}
              <div className="quiz-stepper mb-12">
                {quizSteps.map((step, idx) => (
                  <React.Fragment key={step.id}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        "quiz-step-circle",
                        step.id < currentStep && "quiz-step-circle--complete",
                        step.id === currentStep && "quiz-step-circle--active",
                        step.id > currentStep && "quiz-step-circle--inactive",
                      )}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        step.id
                      )}
                    </motion.div>
                    {idx < quizSteps.length - 1 && (
                      <div
                        className={cn(
                          "quiz-step-connector",
                          step.id < currentStep
                            ? "quiz-step-connector--active"
                            : "quiz-step-connector--inactive",
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Question Title */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-10"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {currentQuestion?.title}
                </h3>
                <p className="text-muted-foreground">
                  {currentQuestion?.description}
                </p>
              </motion.div>

              {/* Options Grid */}
              <div className="grid gap-4 sm:grid-cols-2 mb-10">
                {currentQuestion?.options.map((option, idx) => {
                  const isSelected =
                    answers[`step${currentStep}`] === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      onClick={() => handleAnswer(option.id)}
                      className={cn(
                        "quiz-option-card text-left",
                        isSelected &&
                          "quiz-option-card--selected animate-selection-pulse",
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "quiz-option-icon",
                            isSelected
                              ? "quiz-option-icon--selected"
                              : "quiz-option-icon--default",
                          )}
                        >
                          {option.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-foreground">
                              {option.label}
                            </h4>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                              </motion.div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  size="lg"
                >
                  {quiz.back || "Back"}
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered || isSubmitting}
                  size="lg"
                  className="btn-cta min-w-[180px]"
                >
                  {currentStep === quizSteps.length
                    ? quiz.getRecommendation || "Get Recommendation"
                    : quiz.next || "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Recommendation Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 mb-4"
                >
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                  {quiz.recommendedSolution || "Your Recommended Solution"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {quiz.recommendedSolutionDesc ||
                    "Based on your answers, here's what we recommend for your project."}
                </p>
              </div>

              {/* Recommendation Card */}
              <div className="quiz-recommendation-card mb-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="hidden sm:flex items-start justify-center w-20 shrink-0">
                    <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      {recommendation.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {recommendation.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {recommendation.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">
                        {quiz.whatsIncluded || "What's included:"}
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {recommendation.services.map((service, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                            <span className="text-foreground">{service}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {quiz.startOver || "Start Over"}
                </Button>
                <Button asChild size="lg" className="btn-cta">
                  <a href={`/${locale}/contact?recommended=true`}>
                    {quiz.getQuoteForProject || "Get a Quote for This Project"}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
