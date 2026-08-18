export const profile = {
  name: "Sumit Chimkar",
  role: "Software Engineer II",
  focus: "Backend · Distributed Systems · Full-Stack",
  location: "Pune, Maharashtra, India",
  email: "sumitchimkar0@gmail.com",
  phone: "+91 7718899289",
  github: "https://github.com/sumit6675",
  linkedin: "https://www.linkedin.com/in/sumitchimkar/",
  twitter: "https://twitter.com/sumitchimkar2",
  resume: "/Sumit_Chimkar_Resume.pdf",
  avatar: "https://avatars.githubusercontent.com/u/107839503?v=4",
  statement: ["I build systems", "that move money,", "people and planes."],
  about:
    "Full-stack engineer with nearly 4 years building scalable, reliable systems for travel-tech and fintech. I work across the whole path — customer-facing UI, backend APIs, payment orchestration, webhooks, reconciliation, notifications and observability — on Node.js, TypeScript, React and AWS. Most of what I ship runs in production under real traffic, so I care about idempotency, retries and what happens at 2am more than I care about frameworks.",
};

export const metrics = [
  { value: 25, suffix: "%", label: "Latency cut in peak-traffic flows" },
  { value: 40, suffix: "%", label: "Faster mean time to resolution" },
  { value: 99.9, suffix: "%", label: "Notification delivery reliability" },
  { value: 10, suffix: "K+", label: "Programmatic SEO landing pages" },
];

export const experience = [
  {
    company: "udChalo",
    role: "Software Engineer II",
    period: "Jun 2025 — Present",
    year: "2025",
    summary:
      "Own the payment collection platform end to end, plus distributed services, observability and incident response.",
    highlights: [
      "Built an end-to-end payment collection platform on Node.js, React and AWS — customer UI, payment orchestration, webhooks and notifications.",
      "Integrated Easebuzz across UPI, cards, net banking, EMI and wallets with idempotency, retries, failure recovery and reconciliation.",
      "Led design of distributed Node.js microservices on AWS, cutting latency 25% in peak-traffic flows.",
      "Shipped a full-stack hotel platform with inventory and booking integrations, agent dashboard and SEO for 10,000+ landing pages.",
      "Architected event-driven notification workflows on AWS Pinpoint, SNS and SQS at 99.9% delivery reliability.",
      "Automated incident response with AWS Lambda and Zenduty, reducing MTTR by 40%.",
      "Led Redis Enterprise migration and Node.js upgrades, saving ~$1,000/month.",
      "Implemented Prometheus and Dash0 observability, cutting monitoring spend ~$3,000/year.",
    ],
  },
  {
    company: "udChalo",
    role: "Software Engineer",
    period: "Feb 2023 — May 2025",
    year: "2023",
    summary:
      "Airline integrations, real-time flight pipelines and fintech products inside the booking flow.",
    highlights: [
      "Integrated Airline NDC APIs for Air India, IndiGo and Star Air, reducing booking failures by 15%.",
      "Built real-time flight tracking and notification pipelines, cutting support queries by 20%.",
      "Developed high-throughput Node.js APIs, reducing average response time by 30%.",
      "Built dynamic fare workflows for student and medical travellers.",
      "Integrated credit card, credit score and lending flows via LoanTap and Money View.",
      "Embedded ICICI Lombard and Aditya Birla insurance into booking, lifting policy adoption 15%.",
      "Built automated financial reporting and compliance data pipelines.",
    ],
  },
];

export const stack = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "SQL"],
  },
  {
    group: "Backend & APIs",
    items: [
      "Node.js",
      "Microservices",
      "REST",
      "GraphQL",
      "Event-Driven",
      "Distributed Systems",
      "System Design",
      "Webhooks",
    ],
  },
  {
    group: "Frontend",
    items: ["React", "Angular", "Chakra UI", "Responsive UI", "HTML", "CSS"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS Lambda", "S3", "ECS", "SNS", "SQS", "CloudWatch", "Docker", "Kubernetes", "Jenkins", "CI/CD"],
  },
  {
    group: "Data & Caching",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "NoSQL Modeling", "Query Optimization"],
  },
  {
    group: "Payments & Integrations",
    items: ["Easebuzz", "Airline NDC", "Reconciliation", "CleverTap", "FCM", "LoanTap", "Money View"],
  },
  {
    group: "Observability",
    items: ["Prometheus", "Dash0", "New Relic", "Sentry", "Grafana", "Kibana", "Zenduty"],
  },
  {
    group: "Security & Reliability",
    items: ["OAuth 2.0", "PII Masking", "Idempotency", "Retries", "Failure Recovery"],
  },
];

export const marquee = [
  "Node.js",
  "TypeScript",
  "React",
  "AWS",
  "Distributed Systems",
  "Payments",
  "Kubernetes",
  "Redis",
  "PostgreSQL",
  "Event-Driven",
  "Observability",
  "System Design",
  "Ship It",
  "Fix It",
  "Ship It Again",
];

export const projects = [
  {
    index: "01",
    name: "Apna Bazar",
    kind: "Full-stack e-commerce",
    blurb:
      "Secure authentication, product management, cart and order workflows on a MERN stack.",
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    live: "https://apnaabazar.netlify.app/",
    code: "https://github.com/sumit6675/ApnaBazar",
    image: "https://iili.io/HGJmD57.jpg",
  },
  {
    index: "02",
    name: "ShubhYatra",
    kind: "Travel booking platform",
    blurb:
      "Flights, buses and trains in one booking flow, backed by scalable REST APIs.",
    tags: ["React", "Node.js", "REST", "MongoDB"],
    live: "https://shubhyatra.netlify.app/",
    code: "https://github.com/vaibhav-mougha/ShubhYatra",
    image: "https://user-images.githubusercontent.com/107460451/213928222-1d9344df-a41c-4ec6-a2e1-567bd87baeff.jpg",
  },
  {
    index: "03",
    name: "Reliance Digital",
    kind: "E-commerce clone",
    blurb:
      "Authentication, wishlist, cart and checkout against MongoDB-backed REST APIs.",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    live: "https://russdigital.netlify.app/",
    code: "https://github.com/RajParmar03/Reliance_digital_clone#reliance-digital-clone",
    image: "https://i.imgur.com/pmYRZtX.png",
  },
  {
    index: "04",
    name: "Mailchimp",
    kind: "Marketing site clone",
    blurb:
      "Responsive build with authentication, dynamic pricing and Chakra UI components.",
    tags: ["React", "Chakra UI", "JavaScript"],
    live: "https://funny-choux-1083f3.netlify.app/",
    code: "https://github.com/sumit6675/Mailchimp-Clone",
    image: "https://iili.io/H7pHobt.png",
  },
];

export const awards = [
  { title: "Star Performer — FinServ", year: "2025" },
  { title: "Rookie Rockstar of the Month ×3", year: "2025" },
  { title: "Project of the Year — Price Drop Assurance", year: "2024" },
  { title: "You've Made a Difference", year: "2024" },
  { title: "Rising Star", year: "2023" },
];

export const education = {
  degree: "B.E. Mechanical Engineering",
  school: "Savitribai Phule Pune University",
  period: "Aug 2017 — Jun 2021",
  score: "CGPA 8.64 / 10",
};

export const sections = [
  { id: "index", label: "Index" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "impact", label: "Impact" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "activity", label: "Activity" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];
