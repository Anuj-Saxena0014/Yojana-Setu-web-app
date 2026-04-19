// ─────────────────────────────────────────────────────────────────────────────
// data/fallbackSchemes.js  –  Static fallback data when Gemini API is unavailable
// ─────────────────────────────────────────────────────────────────────────────

const fallbackSchemes = [
  {
    id: "pm-kisan-samman-nidhi",
    name: "PM Kisan Samman Nidhi",
    shortDescription: "Direct income support of ₹6,000 per year to small and marginal farmer families across India.",
    description: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central government scheme that provides income support of ₹6,000 per year to all landholding farmer families. The amount is paid in three equal installments of ₹2,000 directly into the bank accounts of beneficiaries through Direct Benefit Transfer (DBT) mode. The scheme aims to supplement the financial needs of farmers for procuring various inputs related to agriculture and allied activities as well as domestic needs.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchedYear: 2019,
    category: "Agriculture",
    imageEmoji: "🌾",
    benefits: [
      "₹6,000 per year in 3 installments of ₹2,000",
      "Direct benefit transfer to bank account",
      "No middlemen — money goes directly to farmers",
      "Covers all landholding farmer families"
    ],
    applicationUrl: "https://pmkisan.gov.in",
    eligibility: {
      occupation: ["Farmer"],
      minAge: 18,
      maxAge: 99,
      maxIncome: 0,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit the PM-KISAN portal at pmkisan.gov.in",
      "Click on 'New Farmer Registration'",
      "Enter your Aadhaar number and state",
      "Fill in your personal and land details",
      "Upload required documents",
      "Submit the application for verification"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Bank Account Passbook",
      "Land Ownership Documents",
      "Mobile Number linked with Aadhaar"
    ]
  },
  {
    id: "ayushman-bharat-pmjay",
    name: "Ayushman Bharat PM-JAY",
    shortDescription: "Free health coverage of ₹5 lakh per family per year for secondary and tertiary hospitalization.",
    description: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY) is the world's largest health assurance scheme. It provides health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization. The scheme covers over 10.74 crore poor and vulnerable families. It covers 3 days of pre-hospitalization and 15 days post-hospitalization expenses such as diagnostics and medicines.",
    ministry: "Ministry of Health and Family Welfare",
    launchedYear: 2018,
    category: "Health",
    imageEmoji: "🏥",
    benefits: [
      "₹5 lakh health coverage per family per year",
      "Cashless and paperless access at empaneled hospitals",
      "Covers pre and post hospitalization expenses",
      "No restriction on family size or age",
      "Coverage for 1,929+ medical procedures"
    ],
    applicationUrl: "https://pmjay.gov.in",
    eligibility: {
      occupation: ["Student", "Farmer", "Employee", "Self-Employed", "Unemployed", "Other"],
      minAge: 0,
      maxAge: 99,
      maxIncome: 300000,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit the Ayushman Bharat website at pmjay.gov.in",
      "Check your eligibility using your Ration Card or RSBY URN number",
      "Visit nearest CSC center or empaneled hospital",
      "Carry Aadhaar card and ration card for verification",
      "Get your e-card generated at the hospital"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Ration Card",
      "Mobile Number",
      "Income Certificate (if needed)"
    ]
  },
  {
    id: "pm-awas-yojana",
    name: "PM Awas Yojana (PMAY)",
    shortDescription: "Affordable housing for all — financial assistance up to ₹2.67 lakh for building pucca houses.",
    description: "Pradhan Mantri Awas Yojana aims to provide affordable housing to the urban and rural poor. Under PMAY-Urban, credit-linked subsidy is provided on home loans. Under PMAY-Gramin (Rural), financial assistance of up to ₹1.20 lakh in plains and ₹1.30 lakh in hilly areas is given for construction of pucca houses. The scheme targets housing for all by providing subsidies and assistance to economically weaker sections.",
    ministry: "Ministry of Housing and Urban Affairs",
    launchedYear: 2015,
    category: "Housing",
    imageEmoji: "🏠",
    benefits: [
      "Subsidy of up to ₹2.67 lakh on home loan interest",
      "Financial aid for house construction in rural areas",
      "Interest subsidy for EWS, LIG, MIG categories",
      "Women co-ownership promotes empowerment"
    ],
    applicationUrl: "https://pmaymis.gov.in",
    eligibility: {
      occupation: ["Student", "Farmer", "Employee", "Self-Employed", "Unemployed", "Other"],
      minAge: 21,
      maxAge: 70,
      maxIncome: 1800000,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit the PMAY portal at pmaymis.gov.in",
      "Click on 'Citizen Assessment' and select appropriate category",
      "Enter Aadhaar number for verification",
      "Fill the application form with required details",
      "Submit and note your application ID"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Income Proof",
      "Property Documents",
      "Bank Account Details",
      "Photograph"
    ]
  },
  {
    id: "mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana",
    shortDescription: "Collateral-free loans up to ₹10 lakh for micro and small enterprises under Shishu, Kishore, and Tarun categories.",
    description: "MUDRA (Micro Units Development & Refinance Agency) Yojana provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises. Loans are given under three categories: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh), and Tarun (₹5,00,001 to ₹10 lakh). The scheme promotes entrepreneurship and self-employment by providing affordable credit to small business owners.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Entrepreneurship",
    imageEmoji: "💼",
    benefits: [
      "Loans up to ₹10 lakh without collateral",
      "Three categories: Shishu, Kishore, Tarun",
      "Low interest rates for small businesses",
      "Available through all banks and MFIs",
      "No processing fee on Shishu loans"
    ],
    applicationUrl: "https://www.mudra.org.in",
    eligibility: {
      occupation: ["Self-Employed", "Other"],
      minAge: 18,
      maxAge: 65,
      maxIncome: 0,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Approach any bank, NBFC, or MFI",
      "Fill the MUDRA loan application form",
      "Submit business plan and required documents",
      "Bank will process and sanction the loan",
      "Amount is credited to your bank account"
    ],
    documentsRequired: [
      "Identity Proof (Aadhaar/Voter ID)",
      "Address Proof",
      "Business Plan or Proposal",
      "Bank Statements (last 6 months)",
      "Passport-size Photographs"
    ]
  },
  {
    id: "sukanya-samriddhi-yojana",
    name: "Sukanya Samriddhi Yojana",
    shortDescription: "Government-backed savings scheme for the girl child with attractive interest rates and tax benefits.",
    description: "Sukanya Samriddhi Yojana (SSY) is a savings scheme for the girl child, launched under the Beti Bachao, Beti Padhao campaign. Parents or legal guardians can open an account for a girl child below 10 years of age. The scheme offers one of the highest interest rates among small savings schemes and provides tax benefits under Section 80C. The minimum deposit is ₹250 and maximum is ₹1.5 lakh per year.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Women Welfare",
    imageEmoji: "👧",
    benefits: [
      "High interest rate (currently ~8% p.a.)",
      "Tax deduction under Section 80C",
      "Maturity amount is completely tax-free",
      "Partial withdrawal allowed for higher education after age 18",
      "Minimum deposit of just ₹250 per year"
    ],
    applicationUrl: "https://www.india.gov.in/sukanya-samriddhi-yojna",
    eligibility: {
      occupation: ["Student", "Farmer", "Employee", "Self-Employed", "Unemployed", "Other"],
      minAge: 0,
      maxAge: 10,
      maxIncome: 0,
      gender: ["Female"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit nearest Post Office or authorized bank",
      "Fill the Sukanya Samriddhi Account opening form",
      "Submit required documents along with initial deposit",
      "Account will be opened and passbook will be issued"
    ],
    documentsRequired: [
      "Birth Certificate of the girl child",
      "Identity Proof of parent/guardian",
      "Address Proof of parent/guardian",
      "Passport-size photographs"
    ]
  },
  {
    id: "pm-scholarship-scheme",
    name: "PM Scholarship Scheme (PMSS)",
    shortDescription: "Scholarships for wards of ex-servicemen and ex-Coast Guard personnel for professional and technical education.",
    description: "The Prime Minister's Scholarship Scheme provides financial assistance to the wards and widows of ex-servicemen and ex-Coast Guard personnel for pursuing professional and technical education. Boys receive ₹2,500 per month and girls receive ₹3,000 per month. The scholarship is available for courses like MBBS, BDS, Engineering, MBA, BBA, BCA, and other professional degrees.",
    ministry: "Ministry of Defence",
    launchedYear: 2006,
    category: "Education",
    imageEmoji: "📚",
    benefits: [
      "₹3,000/month for girls, ₹2,500/month for boys",
      "Covers professional and technical courses",
      "Duration: 1 to 5 years depending on course",
      "Direct benefit transfer to student's account"
    ],
    applicationUrl: "https://scholarships.gov.in",
    eligibility: {
      occupation: ["Student"],
      minAge: 17,
      maxAge: 25,
      maxIncome: 600000,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit the National Scholarship Portal (NSP)",
      "Register and create your account",
      "Fill the scholarship application form online",
      "Upload required documents",
      "Submit application before the deadline"
    ],
    documentsRequired: [
      "Ex-serviceman discharge certificate",
      "Student's Aadhaar Card",
      "Mark sheets of last qualifying exam",
      "Bank Account Details",
      "College admission letter"
    ]
  },
  {
    id: "stand-up-india",
    name: "Stand Up India",
    shortDescription: "Bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs to set up greenfield enterprises.",
    description: "Stand Up India scheme facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and one woman borrower per bank branch for setting up a greenfield enterprise. The scheme covers manufacturing, services, and trading sectors. It provides handholding support and a dedicated portal for easy application.",
    ministry: "Ministry of Finance",
    launchedYear: 2016,
    category: "Entrepreneurship",
    imageEmoji: "🚀",
    benefits: [
      "Loans from ₹10 lakh to ₹1 crore",
      "Covers up to 75% of project cost",
      "Repayment period up to 7 years",
      "Margin money of only 25%",
      "Handholding support through SIDBI"
    ],
    applicationUrl: "https://www.standupmitra.in",
    eligibility: {
      occupation: ["Self-Employed", "Unemployed", "Other"],
      minAge: 18,
      maxAge: 65,
      maxIncome: 0,
      gender: ["Male", "Female", "Other"],
      category: ["SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit standupmitra.in portal",
      "Register and fill online application",
      "Select nearest bank branch",
      "Submit project report and documents",
      "Bank will evaluate and sanction the loan"
    ],
    documentsRequired: [
      "Identity Proof",
      "Address Proof",
      "Caste Certificate (for SC/ST)",
      "Project Report",
      "Bank Statements"
    ]
  },
  {
    id: "atal-pension-yojana",
    name: "Atal Pension Yojana (APY)",
    shortDescription: "Government-guaranteed pension scheme for unorganized sector workers with monthly pension of ₹1,000 to ₹5,000.",
    description: "Atal Pension Yojana is a pension scheme for citizens of India focused on the unorganized sector workers. Under APY, guaranteed minimum pension of ₹1,000 to ₹5,000 per month is provided after the age of 60 years, depending on the contribution. The central government co-contributes 50% of the total contribution or ₹1,000 per annum, whichever is lower.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Social Security",
    imageEmoji: "🛡️",
    benefits: [
      "Guaranteed monthly pension of ₹1,000 to ₹5,000",
      "Government co-contribution for eligible subscribers",
      "Spouse gets same pension after subscriber's death",
      "Nominee receives accumulated pension wealth",
      "Tax benefits under Section 80CCD"
    ],
    applicationUrl: "https://www.npscra.nsdl.co.in/scheme-details.php",
    eligibility: {
      occupation: ["Farmer", "Employee", "Self-Employed", "Other"],
      minAge: 18,
      maxAge: 40,
      maxIncome: 0,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit any bank where you have a savings account",
      "Fill the APY registration form",
      "Provide Aadhaar and mobile number",
      "Choose pension amount (₹1,000 to ₹5,000)",
      "Set up auto-debit from your savings account"
    ],
    documentsRequired: [
      "Savings Bank Account",
      "Aadhaar Card",
      "Mobile Number",
      "Nominee Details"
    ]
  },
  {
    id: "pm-kaushal-vikas-yojana",
    name: "PM Kaushal Vikas Yojana (PMKVY)",
    shortDescription: "Free skill development training and certification to youth for improving employability.",
    description: "Pradhan Mantri Kaushal Vikas Yojana is the flagship scheme for skill development. It provides free skill training and certification to Indian youth. Training is provided through empaneled training centers across India. Trainees also receive a monetary reward upon successful certification. The scheme covers over 300 job roles across various sectors.",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    launchedYear: 2015,
    category: "Skill Development",
    imageEmoji: "⚙️",
    benefits: [
      "Free skill development training",
      "Monetary reward of ₹8,000 on certification",
      "Industry-relevant curriculum",
      "Placement assistance after training",
      "Recognition of prior learning"
    ],
    applicationUrl: "https://www.pmkvyofficial.org",
    eligibility: {
      occupation: ["Student", "Unemployed", "Other"],
      minAge: 15,
      maxAge: 45,
      maxIncome: 0,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit pmkvyofficial.org and find nearest training center",
      "Enroll at the training center with required documents",
      "Complete the training program",
      "Appear for assessment and certification",
      "Receive certificate and monetary reward"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Educational Certificates",
      "Bank Account Details",
      "Passport-size Photographs"
    ]
  },
  {
    id: "pm-ujjwala-yojana",
    name: "PM Ujjwala Yojana",
    shortDescription: "Free LPG connections to women from BPL households to reduce health hazards from cooking with fossil fuels.",
    description: "Pradhan Mantri Ujjwala Yojana provides free LPG connections to women from Below Poverty Line (BPL) households. The scheme aims to safeguard the health of women and children by providing clean cooking fuel. Under the scheme, a financial support of ₹1,600 is provided for each LPG connection. The scheme has been expanded under Ujjwala 2.0 to cover more beneficiaries.",
    ministry: "Ministry of Petroleum and Natural Gas",
    launchedYear: 2016,
    category: "Women Welfare",
    imageEmoji: "🔥",
    benefits: [
      "Free LPG connection with ₹1,600 support",
      "Free first LPG refill and stove",
      "EMI facility for buying stove and refill",
      "Reduces indoor air pollution and health risks"
    ],
    applicationUrl: "https://www.pmujjwalayojana.com",
    eligibility: {
      occupation: ["Farmer", "Employee", "Self-Employed", "Unemployed", "Other"],
      minAge: 18,
      maxAge: 99,
      maxIncome: 200000,
      gender: ["Female"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit nearest LPG distributor",
      "Fill the Ujjwala Yojana application form",
      "Submit required documents",
      "Verification will be done by the distributor",
      "LPG connection will be issued after approval"
    ],
    documentsRequired: [
      "BPL Certificate or Ration Card",
      "Aadhaar Card",
      "Bank Account/Passbook",
      "Passport-size Photograph"
    ]
  },
  {
    id: "national-scholarship-portal",
    name: "National Scholarship Portal (NSP)",
    shortDescription: "One-stop platform for various central and state scholarships for students from minority, SC/ST, and OBC communities.",
    description: "The National Scholarship Portal provides a single-window electronic platform for various scholarship schemes by central and state governments. It covers pre-matric, post-matric, and merit-cum-means-based scholarships for students belonging to minority communities, SC, ST, OBC categories, and economically weaker sections. Multiple scholarships worth ₹500 to ₹50,000+ per year are available.",
    ministry: "Ministry of Electronics and Information Technology",
    launchedYear: 2015,
    category: "Education",
    imageEmoji: "🎓",
    benefits: [
      "Multiple scholarships on one platform",
      "Pre-matric and post-matric scholarships available",
      "Covers tuition fees and maintenance allowance",
      "Direct benefit transfer to student accounts",
      "Easy online application and tracking"
    ],
    applicationUrl: "https://scholarships.gov.in",
    eligibility: {
      occupation: ["Student"],
      minAge: 10,
      maxAge: 35,
      maxIncome: 800000,
      gender: ["Male", "Female", "Other"],
      category: ["OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit scholarships.gov.in",
      "Register using Aadhaar or other ID",
      "Browse and select applicable scholarships",
      "Fill the application form with academic and income details",
      "Upload documents and submit before deadline"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Income Certificate",
      "Caste Certificate (if applicable)",
      "Mark Sheets / Academic Records",
      "Bank Account Details",
      "College/Institute Verification"
    ]
  },
  {
    id: "pm-jan-dhan-yojana",
    name: "PM Jan Dhan Yojana (PMJDY)",
    shortDescription: "Zero-balance bank accounts with RuPay debit card and ₹2 lakh accident insurance for financial inclusion.",
    description: "Pradhan Mantri Jan Dhan Yojana is a national mission for financial inclusion to ensure access to financial services. It provides zero-balance savings accounts with a RuPay debit card having ₹2 lakh accident insurance cover. Account holders also get an overdraft facility of up to ₹10,000 and life insurance cover of ₹30,000. The scheme has brought millions of unbanked citizens into the formal banking system.",
    ministry: "Ministry of Finance",
    launchedYear: 2014,
    category: "Financial Inclusion",
    imageEmoji: "🏦",
    benefits: [
      "Zero-balance savings account",
      "RuPay debit card with ₹2 lakh accident insurance",
      "₹30,000 life insurance cover",
      "Overdraft facility up to ₹10,000",
      "Direct benefit transfer of government subsidies"
    ],
    applicationUrl: "https://pmjdy.gov.in",
    eligibility: {
      occupation: ["Student", "Farmer", "Employee", "Self-Employed", "Unemployed", "Other"],
      minAge: 10,
      maxAge: 99,
      maxIncome: 0,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    },
    howToApply: [
      "Visit any bank branch or Banking Correspondent",
      "Fill the simplified account opening form",
      "Submit KYC documents",
      "Account will be opened immediately",
      "RuPay card will be issued"
    ],
    documentsRequired: [
      "Aadhaar Card (or any valid ID)",
      "Passport-size Photograph",
      "If Aadhaar not available, any govt issued ID + address proof"
    ]
  }
];

module.exports = fallbackSchemes;
