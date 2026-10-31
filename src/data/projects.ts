/**
 * Projects Data
 * 
 * Strict honesty rules:
 * - Never invent facts, metrics, or results.
 * - Project 3 is explicitly marked "In progress, to be added".
 * - Unverified case-study metrics show "[ADD: result after I provide it]".
 * - Includes optional role and team member fields to credit collaborators honestly.
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Machine Learning' | 'NLP & Extensions' | 'Data Systems';
  status: 'Completed' | 'In Progress';
  statusLabel?: string;
  summary: string;
  problem: string;
  solution: string;
  overview: string;
  architecture: string[];
  keyChallenges: string[];
  limitations: string[];
  deliverables: string[];
  techStack: string[];
  role: string;
  teamMembers?: string[];
  verifiedMetrics?: { label: string; value: string; description?: string }[];
  caseStudyPlaceholder?: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  dateRange: string;
}

export const projectsData: Project[] = [
  {
    id: 'eduretain-ai',
    title: 'EduRetain AI',
    subtitle: 'Student Churn Prediction & Retention Intervention Platform',
    category: 'Machine Learning',
    status: 'Completed',
    summary:
      'A calibrated machine learning triage engine designed for academic institutions to identify students at risk of attrition early, isolate root causes, and prescribe targeted retention interventions.',
    overview:
      'EduRetain AI is an applied machine learning and decision-support platform designed for academic advisors and retention officers. Traditional university retention strategies rely on end-of-semester grade reports or formal drop-out notices—points at which student attrition has already materialized. EduRetain AI establishes a predictive early-warning pipeline combining academic performance records, daily LMS digital telemetry, and bursar payment holds into an interpretable risk assessment.',
    problem:
      'University advisors face information overload from disparate campus databases (LMS logins, registrar grades, bursar hold notices) without an aggregated, early-warning signal. By the time a student formally fails midterms or disengages from coursework, interventions are costly, reactive, and often ineffective.',
    solution:
      'Constructed a multi-vector feature engineering pipeline that transforms raw student telemetry into standardized risk tiers. The system couples a calibrated XGBoost classifier with an automated prescriptive engine that matches diagnosed root-cause drivers to actionable academic, financial, or behavioral intervention strategies.',
    architecture: [
      'Multi-Vector Telemetry Pipeline: Feature scaling and one-hot encoding across 15+ student engagement attributes (attendance %, quiz averages, days since last login, submission punctuality, tuition holds).',
      'Calibrated Machine Learning Engine: Calibrated XGBoost classifier producing probability distributions mapped to 4 actionable tiers (Critical: 75–100%, High: 50–74%, Moderate: 25–49%, Safe: <25%).',
      'Prescriptive Solution Matching: Diagnostic engine mapping root causes to 4 support domains (Academic Tutoring, Re-Engagement Pods, Micro-Grants, and Advising).',
      'What-If Scenario Simulator: Interactive advisory simulation calculating projected net risk lift upon hypothetical parameter improvements.',
      'Data Integrity & Storage: Local SQLite database with salted SHA-256 user authentication and role-based triage profiles.',
    ],
    keyChallenges: [
      'Handling Severe Class Imbalance: Standard academic cohorts have significantly fewer dropouts than retained students, requiring stratified sampling and threshold calibration to balance precision and recall.',
      'Preventing Data Leakage: Ensuring time-dependent features (e.g. cumulative quiz scores) do not inadvertently encode future post-census drop events.',
      'Model Interpretability: Building transparent root-cause diagnostics so academic counselors understand why a student is flagged, rather than presenting an opaque risk score.',
    ],
    limitations: [
      'Trained and evaluated on institution-specific synthetic telemetry datasets; cross-university domain adaptation requires re-calibration.',
      'External life events (unrecorded personal emergencies) remain outside digital telemetry scope and require human advisor verification.',
    ],
    deliverables: [
      'Trained XGBoost model artifacts and evaluation pipelines',
      'Prescriptive intervention matching matrix',
      'Interactive advisor triage dashboard with "What-If" scenario simulator',
      'Batch CSV student roster upload and intervention report export engine',
    ],
    techStack: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'NumPy', 'SQLite', 'Flask'],
    role: 'Lead ML & System Developer',
    teamMembers: ['Harshit Vishwakarma (Solo Project)'],
    verifiedMetrics: [
      { label: 'Model Accuracy', value: '87.5%', description: 'Overall classification accuracy across test split' },
      { label: 'ROC-AUC', value: '0.883', description: 'Area under receiver operating characteristic curve' },
      { label: 'Precision', value: '66.7%', description: 'Proportion of correctly identified at-risk students' },
      { label: 'Recall', value: '60.5%', description: 'Coverage of actual student churn occurrences' },
    ],
    githubUrl: 'https://github.com/Harshit82500',
    liveUrl: '[ADD: Live deployment URL if hosted]',
    image: '/images/projects/eduretain.png',
    dateRange: '2026',
  },
  {
    id: 'dark-pattern-detector',
    title: 'Dark Pattern Detector',
    subtitle: 'Deceptive E-Commerce Design Pattern Detection System',
    category: 'NLP & Extensions',
    status: 'Completed',
    summary:
      'A real-time browser inspection service coupling a Manifest V3 Chrome extension with a fine-tuned DistilBERT inference backend to detect and flag manipulative e-commerce copy.',
    overview:
      'Dark Pattern Detector combines a lightweight Manifest V3 Chrome browser extension with a local or hosted FastAPI microservice. As consumers navigate e-commerce storefronts, deceptive user interface patterns (such as artificial countdown timers, hidden checkout surcharges, and shame-based opt-outs) manipulate decision-making. This tool analyzes DOM text nodes in real time, classifies deceptive rhetoric using fine-tuned transformer weights, and visually flags manipulative elements with descriptive warning tooltips.',
    problem:
      'Cognitive dark patterns have become pervasive across online commerce. Consumers rarely have the time or specialized awareness to distinguish genuine scarcity from algorithmically fabricated urgency, leading to involuntary purchases and subscription entrapment.',
    solution:
      'Architected a decoupled client-server architecture: a Chrome extension observes DOM mutations, extracts candidate text snippets, and dispatches asynchronous batch requests to a FastAPI backend running a fine-tuned DistilBERT classifier. Detected patterns receive visual annotations and explanatory callouts directly on the rendered webpage.',
    architecture: [
      'Manifest V3 Extension: Content scripts running lightweight mutation observers to identify and extract promotional or checkout text blocks.',
      'FastAPI Microservice: High-throughput asynchronous REST inference backend accepting batch text queries and returning classification labels.',
      'DistilBERT Classification Head: Fine-tuned transformer model categorizing text into 4 primary dark pattern typologies (False Urgency, Hidden Costs, Confirmshaming, Forced Continuity).',
      'Diagnostic & Labeling Pipeline: Dedicated data collection scrapers, rule-based auto-labeling baselines, and a manual labeling UI for ongoing model refinement.',
    ],
    keyChallenges: [
      'Latency Optimization: Browser extensions require sub-second inference round-trips to prevent visual disruption or layout stutter during active shopping sessions.',
      'Context Sensitivity: Differentiating between legitimate business notices (e.g. genuine warehouse shipping schedules) and fabricated urgency claims.',
      'Manifest V3 Service Worker Limits: Adapting to background script lifecycle constraints and strict CSP rules on modern browsers.',
    ],
    limitations: [
      'Focuses primarily on textual deception; purely visual patterns (e.g. misleading button color contrast or disguised ads) are outside the model scope.',
      'Dataset primarily reflects e-commerce terminology and requires continual retraining for emerging retail platforms.',
    ],
    deliverables: [
      'Manifest V3 Chrome Extension package',
      'FastAPI backend service (`backend/main.py`) with test verification suite',
      'Model training pipeline with fine-tuned DistilBERT weights',
      'Dataset scraper, labeling UI, and TF-IDF diagnostic scripts',
    ],
    techStack: ['Python', 'FastAPI', 'DistilBERT', 'PyTorch', 'Chrome Extension API', 'JavaScript'],
    role: 'ML & Extension Developer',
    teamMembers: ['Collaborative Team Project'],
    caseStudyPlaceholder: '[ADD: result after I provide it]',
    githubUrl: 'https://github.com/Harshit82500',
    liveUrl: '[ADD: Chrome Web Store link if published]',
    image: '/images/projects/dark-pattern.png',
    dateRange: '2026',
  },
  {
    id: 'compass-ai',
    title: 'CompassAI',
    subtitle: 'Personalized AI Learning Roadmap & Market Intelligence Generator',
    category: 'Data Systems',
    status: 'In Progress',
    statusLabel: 'In progress, to be added',
    summary:
      'An engineering learning platform providing step-by-step personalized curricula grounded in verified open-source roadmaps, authoritative documentation, and live remote job market trends.',
    overview:
      'CompassAI addresses the information saturation and fragmentation faced by self-directed software developers and data analysts. Rather than relying on generic AI hallucinations or uncurated forum threads, CompassAI ingests verified open-source blueprints (from roadmap.sh), cross-references them against live remote hiring listings, and compiles an individualized, schedule-calibrated curriculum with printable export capabilities.',
    problem:
      'Learners transitioning into technical roles frequently encounter curricula disconnected from current market requirements. Rigid monolithic courses fail to adjust to an individual’s available weekly study hours, existing prerequisite background, or preferred pedagogical style.',
    solution:
      'Engineered an architectural pipeline that synthesizes verified curriculum roadmaps, documentation endpoints, and live employment data into deterministic milestone schedules. Learners configure weekly time commitments and target roles, receiving personalized day-by-day learning schedules with high-resolution exportable PDFs.',
    architecture: [
      'Curriculum Blueprint Ingestion: Standardized parsing of official open-source roadmap.sh specifications across 8 core engineering disciplines.',
      'Job Market Intelligence Integration: Ingestion pipeline querying live job market endpoints to highlight in-demand technical requirements.',
      'Adaptive Scheduling Engine: Mathematical workload allocator distributing modules based on available weekly hours and skill level.',
      'Document Export Subsystem: Client-side vector rendering pipeline generating printable study guides and daily practice checklists.',
    ],
    keyChallenges: [
      'Deterministic Curriculum Grounding: Guaranteeing every recommended resource and tutorial originates from authoritative, active documentation rather than speculative models.',
      'Dynamic Timeline Balancing: Ensuring study schedules realistically account for complex prerequisite dependencies without overwhelming the learner.',
    ],
    limitations: [
      'Currently in active development: live API synchronization and account synchronization features are in progress.',
      'Empirical metrics and user adoption statistics are currently being gathered.',
    ],
    deliverables: [
      'React + TypeScript client-side roadmap generator',
      'Curriculum blueprint parsing and schedule allocation engine',
      'High-resolution PDF export pipeline',
      'Grounded resource catalog for 8 engineering roles',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'REST APIs'],
    role: 'Frontend & Data Architecture Developer',
    teamMembers: ['Harshit Vishwakarma (Solo Project)'],
    caseStudyPlaceholder: '[ADD: result after I provide it]',
    githubUrl: 'https://github.com/Harshit82500/ai-roadmap-generator',
    liveUrl: 'https://ai-roadmap-generator-689fe.web.app/',
    image: '/images/projects/compass-ai.png',
    dateRange: '2026',
  },
];
