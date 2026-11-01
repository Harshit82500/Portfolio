/**
 * What I Do / Focus Domains Data
 * 
 * Disciplines with authentic descriptions from the original brief.
 * [ADD] placeholders denote items for user review and confirmation.
 */

export interface WhatIDoItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
  mockupPlaceholder: string;
}

export const whatIDoData: WhatIDoItem[] = [
  {
    id: 'data-analytics',
    number: '01',
    title: 'DATA ANALYTICS',
    category: 'Analysis & Pipelines',
    tagline: 'Automated ETL workflows, statistical hypothesis testing, and telemetry diagnostics.',
    description:
      'Grounded in methodical data hygiene, dimensional schema modeling, and robust exploratory data analysis (EDA). I construct reproducible cleansing pipelines to convert raw, noisy institutional and commercial telemetry into verified datasets ready for strategic decision-making. [ADD: Confirm domain preference, e.g., higher education or financial risk datasets].',
    deliverables: [
      'Automated ETL pipelines (Alteryx & Python)',
      'Exploratory data analysis reports with reproducible notebooks',
      'Data sanitization, imputation, and integrity verification',
      'Statistical distributions and hypothesis testing',
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'SQL', 'Alteryx Designer'],
    mockupPlaceholder: 'ETL Pipeline & Exploratory Telemetry Matrix',
  },
  {
    id: 'machine-learning',
    number: '02',
    title: 'MACHINE LEARNING',
    category: 'Predictive Modeling',
    tagline: 'Calibrated classifiers, NLP feature heads, and latency-optimized inference microservices.',
    description:
      'Designing applied machine learning architectures that prioritize calibration, metric transparency (ROC-AUC, Precision/Recall over surface accuracy), and interpretability. From gradient-boosted decision trees to transformer text classification with DistilBERT and FastAPI inference microservices. [ADD: Confirm target latency SLAs or serving infrastructure].',
    deliverables: [
      'Supervised classification & probability calibration (XGBoost, Scikit-learn)',
      'Transformer-based NLP classification pipelines (DistilBERT)',
      'Root-cause feature importance diagnostics (SHAP / permutation)',
      'FastAPI REST inference microservices with CORS & batch handling',
    ],
    tools: ['Python', 'XGBoost', 'Scikit-learn', 'PyTorch', 'DistilBERT', 'FastAPI'],
    mockupPlaceholder: 'Calibrated ROC-AUC & Confusion Matrix Dashboard',
  },
  {
    id: 'data-visualization',
    number: '03',
    title: 'DATA VISUALIZATION',
    category: 'Quantitative Reporting',
    tagline: 'Empirical dashboards, honest chart geometries, and actionable KPI interfaces.',
    description:
      'Transforming analytical conclusions into clear, distortion-free quantitative visualizations. Strictly adhering to honest scales, minimal chart junk, and purposeful color encoding to empower non-technical stakeholders to act on data intelligence with confidence. [ADD: Confirm preferred reporting tools, e.g., Power BI / Oracle Analytics Cloud].',
    deliverables: [
      'Executive KPI reporting dashboards',
      'Statistical distribution & correlation visualizations',
      'Oracle Analytics Cloud & Power BI data models',
      'Interactive client-facing analytical visualizations',
    ],
    tools: ['Power BI', 'Oracle Analytics Cloud', 'Matplotlib', 'Seaborn', 'SQL'],
    mockupPlaceholder: 'Executive Telemetry & Multi-Vector KPI Surface',
  },
];
