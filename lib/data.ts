// ============================================
// SERVICES DATA
// ============================================

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  excerpt: string;
  icon: string;
  category: "digital" | "infrastructure" | "security" | "managed";
  features: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
  isFeatured?: boolean;
}

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    description:
      "Custom websites and web applications built with modern frameworks. Fast, accessible, and optimized for conversions.",
    excerpt:
      "High-performance websites built with Next.js, React, and modern frameworks.",
    icon: "Globe",
    category: "digital",
    isFeatured: true,
    features: [
      "Custom design and development",
      "Responsive mobile-first approach",
      "SEO optimization built-in",
      "Performance optimization",
      "CMS integration",
      "E-commerce capabilities",
    ],
    benefits: [
      "Increased online visibility",
      "Better user engagement",
      "Higher conversion rates",
      "Reduced bounce rates",
    ],
    faqs: [
      {
        question: "How long does a website project take?",
        answer:
          "Standard websites: 4-8 weeks. Complex web apps: 3-6 months. Timeline depends on scope and features.",
      },
      {
        question: "What technologies do you use?",
        answer:
          "We primarily use Next.js, React, TypeScript, and Tailwind CSS for modern, performant websites.",
      },
      {
        question: "Do you provide hosting?",
        answer:
          "Yes, we offer managed hosting on Vercel, AWS, or your preferred platform with ongoing maintenance.",
      },
    ],
    relatedServices: ["mobile-apps", "e-commerce", "ui-ux-design"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android. Engaging user experiences that drive results.",
    excerpt:
      "iOS and Android apps built with React Native and native technologies.",
    icon: "Smartphone",
    category: "digital",
    features: [
      "iOS and Android development",
      "Cross-platform with React Native",
      "Native performance",
      "Offline capabilities",
      "Push notifications",
      "App Store optimization",
    ],
    benefits: [
      "Reach mobile users",
      "Improved customer engagement",
      "Brand presence on app stores",
      "Direct communication channel",
    ],
    faqs: [
      {
        question: "Should I build native or cross-platform?",
        answer:
          "Cross-platform (React Native) is cost-effective for most apps. Native is better for performance-critical or hardware-intensive apps.",
      },
      {
        question: "How much does an app cost?",
        answer:
          "Apps range from $15,000 for simple apps to $100,000+ for complex enterprise solutions. We provide detailed quotes after discovery.",
      },
    ],
    relatedServices: ["web-development", "ui-ux-design", "cloud-solutions"],
  },
  {
    slug: "e-commerce",
    title: "E-commerce Solutions",
    shortTitle: "E-commerce",
    description:
      "Complete online store solutions with payment processing, inventory management, and optimized checkout flows.",
    excerpt:
      "Shopify, WooCommerce, and custom e-commerce solutions that convert.",
    icon: "ShoppingCart",
    category: "digital",
    isFeatured: true,
    features: [
      "Custom storefront design",
      "Payment gateway integration",
      "Inventory management",
      "Order processing automation",
      "Multi-currency support",
      "Analytics and reporting",
    ],
    benefits: [
      "24/7 sales capability",
      "Expanded market reach",
      "Reduced operational costs",
      "Data-driven insights",
    ],
    faqs: [
      {
        question: "Which e-commerce platform is best?",
        answer:
          "Shopify for simplicity, WooCommerce for WordPress sites, custom solutions for unique requirements.",
      },
      {
        question: "Can you migrate my existing store?",
        answer:
          "Yes, we handle full migrations including products, customers, and order history with minimal downtime.",
      },
    ],
    relatedServices: ["web-development", "digital-marketing", "cloud-solutions"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & SEO",
    shortTitle: "Marketing",
    description:
      "Data-driven marketing strategies including SEO, paid advertising, and content marketing to grow your online presence.",
    excerpt:
      "SEO, PPC, and content marketing strategies that drive measurable growth.",
    icon: "TrendingUp",
    category: "digital",
    features: [
      "Search engine optimization",
      "Google Ads management",
      "Social media marketing",
      "Content strategy",
      "Email marketing",
      "Conversion optimization",
    ],
    benefits: [
      "Increased organic traffic",
      "Higher search rankings",
      "Better ROI on ad spend",
      "Measurable results",
    ],
    faqs: [
      {
        question: "When will I see SEO results?",
        answer:
          "Initial improvements in 2-3 months; significant gains typically take 6-12 months of consistent effort.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "We don't guarantee specific rankings (no one legitimately can), but we guarantee transparent effort and measurable progress.",
      },
    ],
    relatedServices: ["web-development", "e-commerce", "ui-ux-design"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "Design",
    description:
      "User-centered design that balances aesthetics with usability. Research-backed interfaces that users love.",
    excerpt:
      "Research-driven design that creates intuitive, engaging user experiences.",
    icon: "Palette",
    category: "digital",
    features: [
      "User research and testing",
      "Wireframing and prototyping",
      "Visual design systems",
      "Interaction design",
      "Accessibility compliance",
      "Design system creation",
    ],
    benefits: [
      "Improved user satisfaction",
      "Reduced development costs",
      "Higher conversion rates",
      "Consistent brand experience",
    ],
    faqs: [
      {
        question: "What's included in UI/UX design?",
        answer:
          "Research, wireframes, visual designs, prototypes, and a handoff-ready design system for developers.",
      },
    ],
    relatedServices: ["web-development", "mobile-apps", "e-commerce"],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    shortTitle: "Cloud",
    description:
      "Scalable cloud infrastructure on AWS, Google Cloud, or Azure. Migration, optimization, and managed services.",
    excerpt:
      "AWS, Google Cloud, and Azure solutions for scalable, reliable infrastructure.",
    icon: "Cloud",
    category: "infrastructure",
    features: [
      "Cloud architecture design",
      "Migration planning and execution",
      "Cost optimization",
      "Auto-scaling configuration",
      "Disaster recovery",
      "24/7 monitoring",
    ],
    benefits: [
      "Reduced infrastructure costs",
      "Improved reliability",
      "Automatic scaling",
      "Global reach",
    ],
    faqs: [
      {
        question: "Which cloud provider is best?",
        answer:
          "AWS for breadth of services, Google Cloud for data/ML, Azure for Microsoft ecosystem integration.",
      },
    ],
    relatedServices: ["network-infrastructure", "cybersecurity", "managed-it"],
  },
  {
    slug: "network-infrastructure",
    title: "Network Infrastructure",
    shortTitle: "Networks",
    description:
      "Enterprise networking solutions including design, implementation, and ongoing management for reliable connectivity.",
    excerpt:
      "Enterprise networking design, implementation, and management.",
    icon: "Network",
    category: "infrastructure",
    features: [
      "Network architecture design",
      "Hardware procurement",
      "Wireless solutions",
      "VPN and remote access",
      "Network monitoring",
      "Performance optimization",
    ],
    benefits: [
      "Reliable connectivity",
      "Improved security",
      "Better performance",
      "Reduced downtime",
    ],
    faqs: [
      {
        question: "Do you support existing infrastructure?",
        answer:
          "Yes, we work with existing equipment and can recommend upgrades where beneficial.",
      },
    ],
    relatedServices: ["cloud-solutions", "cybersecurity", "managed-it"],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortTitle: "Security",
    description:
      "Comprehensive security solutions including assessments, implementation, and ongoing monitoring to protect your business.",
    excerpt:
      "Security assessments, implementation, and 24/7 monitoring.",
    icon: "Shield",
    category: "security",
    features: [
      "Security assessments",
      "Penetration testing",
      "Compliance consulting",
      "Incident response",
      "Security awareness training",
      "24/7 security monitoring",
    ],
    benefits: [
      "Reduced risk",
      "Regulatory compliance",
      "Customer trust",
      "Business continuity",
    ],
    faqs: [
      {
        question: "How often should we do security assessments?",
        answer:
          "Annual comprehensive assessments minimum, with quarterly vulnerability scans and continuous monitoring.",
      },
    ],
    relatedServices: ["cloud-solutions", "managed-it", "network-infrastructure"],
  },
  {
    slug: "managed-it",
    title: "Managed IT Services",
    shortTitle: "Managed IT",
    description:
      "Proactive IT management and support. Focus on your business while we handle your technology infrastructure.",
    excerpt:
      "Proactive IT management, monitoring, and support for your business.",
    icon: "Settings",
    category: "managed",
    features: [
      "24/7 monitoring and alerting",
      "Help desk support",
      "Patch management",
      "Backup and recovery",
      "Vendor management",
      "Strategic IT consulting",
    ],
    benefits: [
      "Predictable IT costs",
      "Reduced downtime",
      "Access to expertise",
      "Focus on core business",
    ],
    faqs: [
      {
        question: "What's the difference from break-fix support?",
        answer:
          "Managed IT is proactive—we prevent issues before they happen. Break-fix is reactive—you call when something breaks.",
      },
    ],
    relatedServices: ["cloud-solutions", "cybersecurity", "network-infrastructure"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter((s) => s.category === category);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.isFeatured);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return services.filter((s) => slugs.includes(s.slug));
}

// ============================================
// BLOG DATA
// ============================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "nextjs-15-whats-new",
    title: "What's New in Next.js 15: A Developer's Guide",
    excerpt:
      "Explore the latest features in Next.js 15, including improved caching, React 19 support, and new developer tools.",
    content: "Full article content here...",
    image: "/images/blog/nextjs-15.jpg",
    category: "Development",
    tags: ["Next.js", "React", "Web Development"],
    author: {
      name: "Alex Chen",
      avatar: "/images/team/alex.jpg",
      role: "Lead Developer",
    },
    publishedAt: "2025-01-15",
    readingTime: 8,
    featured: true,
  },
  {
    slug: "ecommerce-conversion-optimization",
    title: "10 E-commerce Optimization Strategies That Actually Work",
    excerpt:
      "Data-backed strategies to improve your online store's conversion rate and increase revenue.",
    content: "Full article content here...",
    image: "/images/blog/ecommerce-optimization.jpg",
    category: "E-commerce",
    tags: ["E-commerce", "Conversion", "Marketing"],
    author: {
      name: "Sarah Miller",
      avatar: "/images/team/sarah.jpg",
      role: "Marketing Director",
    },
    publishedAt: "2025-01-10",
    readingTime: 6,
    featured: true,
  },
  {
    slug: "cloud-migration-checklist",
    title: "The Complete Cloud Migration Checklist for SMBs",
    excerpt:
      "Everything you need to plan and execute a successful cloud migration without disrupting your business.",
    content: "Full article content here...",
    image: "/images/blog/cloud-migration.jpg",
    category: "Infrastructure",
    tags: ["Cloud", "AWS", "Migration"],
    author: {
      name: "David Kumar",
      avatar: "/images/team/david.jpg",
      role: "Cloud Architect",
    },
    publishedAt: "2025-01-05",
    readingTime: 10,
  },
  {
    slug: "cybersecurity-trends-2025",
    title: "Cybersecurity Trends Every Business Should Know in 2025",
    excerpt:
      "Stay ahead of emerging threats with our analysis of the top cybersecurity trends and how to prepare.",
    content: "Full article content here...",
    image: "/images/blog/cybersecurity-2025.jpg",
    category: "Security",
    tags: ["Security", "Cybersecurity", "Trends"],
    author: {
      name: "Maya Jayawardena",
      avatar: "/images/team/maya.jpg",
      role: "Security Consultant",
    },
    publishedAt: "2024-12-28",
    readingTime: 7,
  },
  {
    slug: "seo-for-sri-lankan-businesses",
    title: "SEO Strategies for Sri Lankan Businesses Going Global",
    excerpt:
      "How local businesses can leverage SEO to expand their reach beyond borders while maintaining local relevance.",
    content: "Full article content here...",
    image: "/images/blog/seo-global.jpg",
    category: "Marketing",
    tags: ["SEO", "Marketing", "Sri Lanka"],
    author: {
      name: "Sarah Miller",
      avatar: "/images/team/sarah.jpg",
      role: "Marketing Director",
    },
    publishedAt: "2024-12-20",
    readingTime: 5,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return [];
  
  return blogPosts
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}

// Alias for blog detail page
export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPost[] {
  return getRelatedPosts(currentSlug, limit);
}

// ============================================
// CASE STUDIES DATA
// ============================================

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  services: string[];
  results: { metric: string; value: string; description: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  publishedAt: string;
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "fashionlk-ecommerce-transformation",
    title: "FashionLK: 340% Revenue Growth Through E-commerce Redesign",
    client: "FashionLK",
    excerpt:
      "How we transformed a struggling online store into a high-converting e-commerce platform.",
    content: "Full case study content here...",
    image: "/images/case-studies/fashionlk.jpg",
    category: "E-commerce",
    services: ["e-commerce", "ui-ux-design", "digital-marketing"],
    results: [
      { metric: "Revenue", value: "+340%", description: "Year-over-year growth" },
      { metric: "Conversion", value: "4.2%", description: "Up from 1.1%" },
      { metric: "AOV", value: "+65%", description: "Average order value" },
    ],
    testimonial: {
      quote:
        "Evision didn't just build us a website—they built us a revenue machine. The results speak for themselves.",
      author: "Nimal Perera",
      role: "CEO, FashionLK",
    },
    publishedAt: "2025-01-01",
    featured: true,
  },
  {
    slug: "lankalogistics-digital-transformation",
    title: "LankaLogistics: Digitizing a Traditional Freight Company",
    client: "LankaLogistics",
    excerpt:
      "Complete digital transformation including a customer portal, tracking system, and mobile app.",
    content: "Full case study content here...",
    image: "/images/case-studies/lankalogistics.jpg",
    category: "Digital Transformation",
    services: ["web-development", "mobile-apps", "cloud-solutions"],
    results: [
      { metric: "Efficiency", value: "+45%", description: "Operational efficiency" },
      { metric: "Support", value: "-60%", description: "Customer support tickets" },
      { metric: "NPS", value: "72", description: "Up from 34" },
    ],
    publishedAt: "2024-11-15",
    featured: true,
  },
  {
    slug: "meditech-hipaa-compliance",
    title: "MediTech: Achieving HIPAA Compliance in Record Time",
    client: "MediTech Solutions",
    excerpt:
      "How we helped a healthcare startup become fully HIPAA compliant in just 8 weeks.",
    content: "Full case study content here...",
    image: "/images/case-studies/meditech.jpg",
    category: "Security",
    services: ["cybersecurity", "cloud-solutions", "managed-it"],
    results: [
      { metric: "Timeline", value: "8 weeks", description: "To full compliance" },
      { metric: "Audit", value: "100%", description: "First-time audit pass" },
      { metric: "Cost", value: "-40%", description: "vs. industry average" },
    ],
    publishedAt: "2024-10-20",
  },
  {
    slug: "ceylon-hotels-booking-platform",
    title: "Ceylon Hotels: Custom Booking Platform Driving Direct Sales",
    client: "Ceylon Hotels Group",
    excerpt:
      "Reducing OTA dependency by building a high-converting direct booking platform.",
    content: "Full case study content here...",
    image: "/images/case-studies/ceylon-hotels.jpg",
    category: "Web Development",
    services: ["web-development", "e-commerce", "digital-marketing"],
    results: [
      { metric: "Direct", value: "+180%", description: "Direct bookings" },
      { metric: "Commission", value: "-$2.4M", description: "Saved annually" },
      { metric: "Mobile", value: "68%", description: "Mobile bookings" },
    ],
    publishedAt: "2024-09-10",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.featured);
}

export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  return caseStudies.filter((c) => c.category === category);
}

// ============================================
// FAQ DATA
// ============================================

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export const generalFaqs: FAQ[] = [
  {
    question: "How long does a website project take?",
    answer:
      "Standard websites: 4-8 weeks. Complex web apps: 3-6 months. We provide a detailed timeline during discovery.",
  },
  {
    question: "What are your pricing options?",
    answer:
      "Fixed-price, time & materials, or retainer. Transparent quotes with no hidden fees—tailored to your budget.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Maintenance packages include updates, security patches, monitoring, and technical support (up to 24/7).",
  },
  {
    question: "When will I see SEO results?",
    answer:
      "Initial improvements in 2-3 months; significant gains in 6-12 months. Paid ads deliver immediate traffic.",
  },
  {
    question: "How do you handle security?",
    answer:
      "SSL, secure coding, regular audits, encryption, and compliance with GDPR/PCI-DSS where applicable.",
  },
  {
    question: "Can you host my website?",
    answer:
      "Yes. Managed hosting on AWS, Google Cloud, or Azure—including scaling, backups, and monitoring.",
  },
];

// ============================================
// TEAM DATA
// ============================================

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Rajitha Fernando",
    role: "Founder & CEO",
    avatar: "/images/team/rajitha.jpg",
    bio: "15+ years in tech leadership. Previously at WSO2 and IFS.",
    linkedin: "https://linkedin.com/in/rajithafernando",
  },
  {
    name: "Alex Chen",
    role: "Lead Developer",
    avatar: "/images/team/alex.jpg",
    bio: "Full-stack expert specializing in React and Node.js ecosystems.",
    linkedin: "https://linkedin.com/in/alexchen",
  },
  {
    name: "Sarah Miller",
    role: "Marketing Director",
    avatar: "/images/team/sarah.jpg",
    bio: "Data-driven marketer with expertise in SEO and growth strategies.",
    linkedin: "https://linkedin.com/in/sarahmiller",
  },
  {
    name: "David Kumar",
    role: "Cloud Architect",
    avatar: "/images/team/david.jpg",
    bio: "AWS certified architect with experience in enterprise migrations.",
    linkedin: "https://linkedin.com/in/davidkumar",
  },
];
