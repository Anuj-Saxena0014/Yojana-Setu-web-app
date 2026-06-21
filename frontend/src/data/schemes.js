// ─────────────────────────────────────────────────────────────────────────────
// src/data/localSchemes.js  –  Frontend copy of scheme data (API fallback)
// ─────────────────────────────────────────────────────────────────────────────
// This mirrors backend/data/schemes.js so the app works even without MongoDB.

const schemes = [
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    shortDescription: "Direct income support of ₹6,000 per year to small and marginal farmers.",
    description: "Under PM-KISAN, all landholding farmers' families receive income support of ₹6,000 per year in three equal installments of ₹2,000 each. The fund is directly transferred to the bank accounts of the beneficiaries.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchedYear: 2019,
    category: "Agriculture",
    imageEmoji: "🌾",
    benefits: ["₹6,000 annual financial assistance", "Direct bank transfer (DBT)", "No intermediaries"],
    applicationUrl: "https://pmkisan.gov.in",
    eligibility: { occupation: ["Farmer"], minAge: 18, maxAge: 99, maxIncome: 200000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "2",
    name: "PM Ujjwala Yojana",
    shortDescription: "Free LPG connections to women from BPL households for clean cooking fuel.",
    description: "Pradhan Mantri Ujjwala Yojana (PMUY) aims to safeguard the health of women and children by providing clean cooking fuel – LPG so that they don't have to compromise their health in smoky kitchens.",
    ministry: "Ministry of Petroleum and Natural Gas",
    launchedYear: 2016,
    category: "Women Welfare",
    imageEmoji: "🔥",
    benefits: ["Free LPG connection", "First refill free", "Health & environment benefits"],
    applicationUrl: "https://pmuy.gov.in",
    eligibility: { occupation: ["Farmer","Employee","Self-Employed","Unemployed","Other"], minAge: 18, maxAge: 99, maxIncome: 100000, gender: ["Female"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "3",
    name: "National Scholarship Portal (NSP)",
    shortDescription: "Central scholarships for students from minority, SC/ST, and OBC communities.",
    description: "National Scholarship Portal is a one-stop platform for students to apply for various central and state government scholarships. It covers Pre-Matric, Post-Matric scholarships and merit-based scholarships.",
    ministry: "Ministry of Electronics & IT",
    launchedYear: 2015,
    category: "Education",
    imageEmoji: "📚",
    benefits: ["Annual scholarship amount", "Covers tuition & living expenses", "Renewable annually"],
    applicationUrl: "https://scholarships.gov.in",
    eligibility: { occupation: ["Student"], minAge: 5, maxAge: 30, maxIncome: 250000, gender: ["Male","Female","Other"], category: ["OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "4",
    name: "Ayushman Bharat – PM-JAY",
    shortDescription: "Health cover of ₹5 lakh per family per year for secondary and tertiary hospitalisation.",
    description: "Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides a health cover of ₹5 lakh per family per year for secondary and tertiary hospitalization across public and private empanelled hospitals across India.",
    ministry: "Ministry of Health and Family Welfare",
    launchedYear: 2018,
    category: "Health",
    imageEmoji: "🏥",
    benefits: ["₹5 lakh health cover", "Cashless treatment", "Covers 1,929 procedures"],
    applicationUrl: "https://pmjay.gov.in",
    eligibility: { occupation: ["Farmer","Employee","Self-Employed","Unemployed","Other"], minAge: 0, maxAge: 99, maxIncome: 200000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "5",
    name: "Pradhan Mantri Awas Yojana (Urban)",
    shortDescription: "Housing for All mission – subsidy on home loans for EWS/LIG/MIG categories.",
    description: "PM Awas Yojana (Urban) provides housing subsidy to Economically Weaker Sections, Low Income Groups and Middle Income Groups through Credit Linked Subsidy Scheme (CLSS).",
    ministry: "Ministry of Housing and Urban Affairs",
    launchedYear: 2015,
    category: "Housing",
    imageEmoji: "🏠",
    benefits: ["Up to ₹2.67 lakh interest subsidy", "Affordable home loans", "Pucca house guarantee"],
    applicationUrl: "https://pmaymis.gov.in",
    eligibility: { occupation: ["Employee","Self-Employed","Farmer","Unemployed","Other"], minAge: 21, maxAge: 99, maxIncome: 600000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "6",
    name: "Beti Bachao Beti Padhao",
    shortDescription: "Welfare scheme for girl child – promotes education and prevents gender-biased sex selection.",
    description: "Beti Bachao Beti Padhao scheme addresses declining Child Sex Ratio (CSR) and related issues of women empowerment.",
    ministry: "Ministry of Women and Child Development",
    launchedYear: 2015,
    category: "Women Welfare",
    imageEmoji: "👧",
    benefits: ["Educational support for girls", "Financial incentives", "Awareness programs"],
    applicationUrl: "https://wcd.nic.in",
    eligibility: { occupation: ["Student","Unemployed"], minAge: 0, maxAge: 18, maxIncome: 300000, gender: ["Female"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "7",
    name: "PM Mudra Yojana",
    shortDescription: "Loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises.",
    description: "Pradhan Mantri MUDRA Yojana (PMMY) offers collateral-free loans under three categories — Shishu, Kishore, and Tarun — to micro-enterprises.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Entrepreneurship",
    imageEmoji: "💼",
    benefits: ["Loans up to ₹10 lakh", "No collateral required", "Low interest rates"],
    applicationUrl: "https://mudra.org.in",
    eligibility: { occupation: ["Self-Employed","Unemployed","Other"], minAge: 18, maxAge: 60, maxIncome: 500000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "8",
    name: "Post Matric Scholarship for SC Students",
    shortDescription: "Scholarships for SC students studying at post-matriculation or post-secondary stage.",
    description: "The scheme provides financial assistance to SC students studying at post-matriculation or post-secondary stage through state governments.",
    ministry: "Ministry of Social Justice and Empowerment",
    launchedYear: 1944,
    category: "Education",
    imageEmoji: "🎓",
    benefits: ["Maintenance allowance", "Reimbursement of compulsory fees", "Study tour charges"],
    applicationUrl: "https://scholarships.gov.in",
    eligibility: { occupation: ["Student"], minAge: 14, maxAge: 30, maxIncome: 250000, gender: ["Male","Female","Other"], category: ["SC"], states: ["All"] },
  },
  {
    id: "9",
    name: "Startup India Seed Fund",
    shortDescription: "Financial assistance to startups for proof of concept, prototype, and market entry.",
    description: "Startup India Seed Fund Scheme (SISFS) provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
    ministry: "DPIIT, Ministry of Commerce and Industry",
    launchedYear: 2021,
    category: "Entrepreneurship",
    imageEmoji: "🚀",
    benefits: ["Up to ₹20 lakh for PoC", "Up to ₹50 lakh for scale-up", "Mentorship support"],
    applicationUrl: "https://seedfund.startupindia.gov.in",
    eligibility: { occupation: ["Self-Employed","Employee"], minAge: 18, maxAge: 45, maxIncome: 1000000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "10",
    name: "Sukanya Samriddhi Yojana",
    shortDescription: "Small savings scheme for a girl child, offering high interest rate and tax benefits.",
    description: "Sukanya Samriddhi Yojana is a government savings scheme for girl children under the 'Beti Bachao Beti Padhao' initiative.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Women Welfare",
    imageEmoji: "💰",
    benefits: ["High interest rate (~8.2%)", "Tax deduction under 80C", "Matures at age 21"],
    applicationUrl: "https://www.indiapost.gov.in",
    eligibility: { occupation: ["Student","Unemployed"], minAge: 0, maxAge: 10, maxIncome: 500000, gender: ["Female"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "11",
    name: "PM Kaushal Vikas Yojana (PMKVY)",
    shortDescription: "Free skill training for youth under the National Skill Development Mission.",
    description: "PMKVY enables Indian youth to take up industry-relevant skill training that will help them secure a better livelihood.",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    launchedYear: 2015,
    category: "Skill Development",
    imageEmoji: "⚙️",
    benefits: ["Free skill training", "Industry-recognised certification", "Placement assistance"],
    applicationUrl: "https://pmkvyofficial.org",
    eligibility: { occupation: ["Student","Unemployed","Farmer","Other"], minAge: 15, maxAge: 45, maxIncome: 300000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "12",
    name: "National Old Age Pension Scheme",
    shortDescription: "Monthly pension to BPL elderly citizens aged 60 years and above.",
    description: "NOAPS provides central assistance at the rate of ₹200 per month for persons aged 60–79 years and ₹500 per month for persons aged 80 years and above.",
    ministry: "Ministry of Rural Development",
    launchedYear: 1995,
    category: "Social Security",
    imageEmoji: "👴",
    benefits: ["₹200–₹500/month pension", "Direct bank transfer", "State top-up available"],
    applicationUrl: "https://nsap.nic.in",
    eligibility: { occupation: ["Unemployed","Farmer","Other"], minAge: 60, maxAge: 99, maxIncome: 100000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "13",
    name: "Atal Pension Yojana",
    shortDescription: "Guaranteed monthly pension of ₹1,000–₹5,000 for unorganised sector workers.",
    description: "Atal Pension Yojana (APY) is focussed on unorganised sector workers. It guarantees a minimum pension of ₹1,000–₹5,000 per month at age 60.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Social Security",
    imageEmoji: "🛡️",
    benefits: ["Guaranteed pension ₹1K–₹5K/month", "Government co-contribution", "Death & disability cover"],
    applicationUrl: "https://jansuraksha.gov.in",
    eligibility: { occupation: ["Farmer","Self-Employed","Unemployed","Other"], minAge: 18, maxAge: 40, maxIncome: 300000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  {
    id: "14",
    name: "Dr. Ambedkar Post Matric Scholarship (OBC)",
    shortDescription: "Financial assistance to OBC students for post-matriculation studies.",
    description: "This scheme provides financial assistance to students belonging to Other Backward Classes to enable them to pursue post-matriculation courses.",
    ministry: "Ministry of Social Justice and Empowerment",
    launchedYear: 1998,
    category: "Education",
    imageEmoji: "📖",
    benefits: ["Maintenance allowance", "Compulsory fee reimbursement", "Study tour & thesis allowance"],
    applicationUrl: "https://scholarships.gov.in",
    eligibility: { occupation: ["Student"], minAge: 14, maxAge: 35, maxIncome: 100000, gender: ["Male","Female","Other"], category: ["OBC"], states: ["All"] },
  },
  {
    id: "15",
    name: "PM Jan Dhan Yojana",
    shortDescription: "Zero-balance bank accounts with RuPay debit card and ₹2 lakh accident insurance.",
    description: "Pradhan Mantri Jan Dhan Yojana ensures access to banking, savings, remittance, credit, insurance, and pension for excluded sections.",
    ministry: "Ministry of Finance",
    launchedYear: 2014,
    category: "Financial Inclusion",
    imageEmoji: "🏦",
    benefits: ["Zero balance account", "RuPay debit card", "₹2 lakh accident insurance", "₹10,000 overdraft facility"],
    applicationUrl: "https://pmjdy.gov.in",
    eligibility: { occupation: ["Farmer","Employee","Self-Employed","Unemployed","Student","Other"], minAge: 10, maxAge: 99, maxIncome: 200000, gender: ["Male","Female","Other"], category: ["General","OBC","SC","ST"], states: ["All"] },
  },
  
  {
    id: "16",
    name: "Pradhan Mantri Fasal Bima Yojana",
    shortDescription: "Crop insurance scheme for farmers against crop losses.",
    description: "Provides financial support to farmers suffering crop loss due to natural calamities, pests, and diseases.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchedYear: 2016,
    category: "Agriculture",
    imageEmoji: "🌾",
    benefits: [
      "Low premium rates",
      "Coverage against crop failure",
      "Financial security for farmers"
    ],
    applicationUrl: "https://pmfby.gov.in",
    eligibility: {
      occupation: ["Farmer"],
      minAge: 18,
      maxAge: 99,
      maxIncome: 99999999,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },
  {
    id: "17",
    name: "Soil Health Card Scheme",
    shortDescription: "Provides soil health information to farmers.",
    description: "Farmers receive soil health cards containing nutrient status and fertilizer recommendations.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchedYear: 2015,
    category: "Agriculture",
    imageEmoji: "🧪",
    benefits: [
      "Soil testing",
      "Better crop productivity",
      "Reduced fertilizer costs"
    ],
    applicationUrl: "https://soilhealth.dac.gov.in",
    eligibility: {
      occupation: ["Farmer"],
      minAge: 18,
      maxAge: 99,
      maxIncome: 99999999,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },
  {
    id: "18",
    name: "Kisan Credit Card",
    shortDescription: "Easy credit access for farmers.",
    description: "Provides short-term credit to farmers for agricultural needs at subsidized interest rates.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchedYear: 1998,
    category: "Agriculture",
    imageEmoji: "💳",
    benefits: [
      "Low-interest loans",
      "Flexible repayment",
      "Quick credit access"
    ],
    applicationUrl: "https://www.myscheme.gov.in",
    eligibility: {
      occupation: ["Farmer"],
      minAge: 18,
      maxAge: 75,
      maxIncome: 99999999,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },

  {
    id: "19",
    name: "Atal Pension Yojana",
    shortDescription: "Guaranteed pension scheme for workers.",
    description: "Provides pension benefits ranging from ₹1,000 to ₹5,000 after retirement.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Pension",
    imageEmoji: "👴",
    benefits: [
      "Guaranteed pension",
      "Government-backed scheme",
      "Retirement security"
    ],
    applicationUrl: "https://npscra.nsdl.co.in",
    eligibility: {
      occupation: ["Any"],
      minAge: 18,
      maxAge: 40,
      maxIncome: 99999999,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },

  {
    id: "20",
    name: "National Pension System",
    shortDescription: "Voluntary retirement savings scheme.",
    description: "Allows citizens to invest regularly and build a retirement corpus.",
    ministry: "Ministry of Finance",
    launchedYear: 2004,
    category: "Pension",
    imageEmoji: "💰",
    benefits: [
      "Tax benefits",
      "Retirement corpus",
      "Flexible investment"
    ],
    applicationUrl: "https://www.npscra.nsdl.co.in",
    eligibility: {
      occupation: ["Any"],
      minAge: 18,
      maxAge: 70,
      maxIncome: 99999999,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },

  {
    id: "21",
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
    shortDescription: "Life insurance coverage of ₹2 lakh.",
    description: "Affordable life insurance scheme providing financial security to families.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Insurance",
    imageEmoji: "🛡️",
    benefits: [
      "₹2 lakh life cover",
      "Low premium",
      "Easy enrollment"
    ],
    applicationUrl: "https://jansuraksha.gov.in",
    eligibility: {
      occupation: ["Any"],
      minAge: 18,
      maxAge: 50,
      maxIncome: 99999999,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },

  {
    id: "22",
    name: "Pradhan Mantri Suraksha Bima Yojana",
    shortDescription: "Accident insurance scheme.",
    description: "Provides accidental death and disability coverage at affordable premiums.",
    ministry: "Ministry of Finance",
    launchedYear: 2015,
    category: "Insurance",
    imageEmoji: "🚑",
    benefits: [
      "₹2 lakh accident cover",
      "Affordable premium",
      "Nationwide availability"
    ],
    applicationUrl: "https://jansuraksha.gov.in",
    eligibility: {
      occupation: ["Any"],
      minAge: 18,
      maxAge: 70,
      maxIncome: 99999999,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },

  {
    id: "23",
    name: "Ayushman Bharat PM-JAY",
    shortDescription: "Health insurance up to ₹5 lakh per family.",
    description: "Provides cashless healthcare services to eligible families.",
    ministry: "Ministry of Health and Family Welfare",
    launchedYear: 2018,
    category: "Health",
    imageEmoji: "🏥",
    benefits: [
      "₹5 lakh health coverage",
      "Cashless treatment",
      "Pan-India hospitals"
    ],
    applicationUrl: "https://pmjay.gov.in",
    eligibility: {
      occupation: ["Any"],
      minAge: 0,
      maxAge: 99,
      maxIncome: 300000,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },

  {
    id: "24",
    name: "Mission Indradhanush",
    shortDescription: "Universal immunization program.",
    description: "Aims to ensure full vaccination coverage for children and pregnant women.",
    ministry: "Ministry of Health and Family Welfare",
    launchedYear: 2014,
    category: "Health",
    imageEmoji: "💉",
    benefits: [
      "Free vaccines",
      "Child healthcare",
      "Disease prevention"
    ],
    applicationUrl: "https://www.mohfw.gov.in",
    eligibility: {
      occupation: ["Any"],
      minAge: 0,
      maxAge: 99,
      maxIncome: 99999999,
      gender: ["Male", "Female", "Other"],
      category: ["General", "OBC", "SC", "ST"],
      states: ["All"]
    }
  },
  {
  id: "25",
  name: "Pradhan Mantri Shram Yogi Maandhan",
  shortDescription: "Voluntary pension scheme for unorganized workers.",
  description:
    "Provides a minimum assured pension of ₹3,000 per month after attaining the age of 60 years to unorganized sector workers.",
  ministry: "Ministry of Labour and Employment",
  launchedYear: 2019,
  category: "Social Security",
  imageEmoji: "👷",
  benefits: [
    "₹3,000 monthly pension",
    "Government contribution",
    "Retirement security"
  ],
  applicationUrl: "https://maandhan.in",
  eligibility: {
    occupation: ["Farmer", "Self-Employed", "Unemployed", "Other"],
    minAge: 18,
    maxAge: 40,
    maxIncome: 150000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "26",
  name: "Stand Up India Scheme",
  shortDescription: "Bank loans for SC/ST and women entrepreneurs.",
  description:
    "Facilitates bank loans between ₹10 lakh and ₹1 crore for setting up greenfield enterprises.",
  ministry: "Ministry of Finance",
  launchedYear: 2016,
  category: "Entrepreneurship",
  imageEmoji: "📈",
  benefits: [
    "Business loans",
    "Support for startups",
    "Women & SC/ST empowerment"
  ],
  applicationUrl: "https://www.standupmitra.in",
  eligibility: {
    occupation: ["Self-Employed", "Unemployed"],
    minAge: 18,
    maxAge: 65,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["SC", "ST"],
    states: ["All"]
  }
},

{
  id: "27",
  name: "PM SVANidhi",
  shortDescription: "Working capital loan for street vendors.",
  description:
    "Provides collateral-free working capital loans to street vendors affected by the COVID-19 pandemic.",
  ministry: "Ministry of Housing and Urban Affairs",
  launchedYear: 2020,
  category: "Entrepreneurship",
  imageEmoji: "🛒",
  benefits: [
    "Collateral-free loan",
    "Interest subsidy",
    "Digital transaction rewards"
  ],
  applicationUrl: "https://pmsvanidhi.mohua.gov.in",
  eligibility: {
    occupation: ["Self-Employed", "Other"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "28",
  name: "National Apprenticeship Promotion Scheme",
  shortDescription: "Promotes apprenticeship training for youth.",
  description:
    "Provides financial support to establishments undertaking apprenticeship training.",
  ministry: "Ministry of Skill Development and Entrepreneurship",
  launchedYear: 2016,
  category: "Skill Development",
  imageEmoji: "🛠️",
  benefits: [
    "Industry training",
    "Stipend support",
    "Better employability"
  ],
  applicationUrl: "https://www.apprenticeshipindia.gov.in",
  eligibility: {
    occupation: ["Student", "Unemployed"],
    minAge: 14,
    maxAge: 35,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "29",
  name: "National Means-cum-Merit Scholarship Scheme",
  shortDescription: "Scholarships for meritorious students from weaker sections.",
  description:
    "Provides scholarships to meritorious students to reduce dropouts at secondary education level.",
  ministry: "Ministry of Education",
  launchedYear: 2008,
  category: "Education",
  imageEmoji: "🏅",
  benefits: [
    "Annual scholarship",
    "Supports school education",
    "Merit-based selection"
  ],
  applicationUrl: "https://scholarships.gov.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 10,
    maxAge: 18,
    maxIncome: 350000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "30",
  name: "National Fellowship for SC Students",
  shortDescription: "Financial assistance for higher education.",
  description:
    "Provides fellowships to SC students pursuing M.Phil. and Ph.D. programs.",
  ministry: "Ministry of Social Justice and Empowerment",
  launchedYear: 2005,
  category: "Education",
  imageEmoji: "🎓",
  benefits: [
    "Monthly fellowship",
    "Research grants",
    "Support for higher studies"
  ],
  applicationUrl: "https://socialjustice.gov.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 21,
    maxAge: 40,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["SC"],
    states: ["All"]
  }
},

{
  id: "31",
  name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
  shortDescription: "Skill development program for rural youth.",
  description:
    "Provides placement-linked skill training for poor rural youth.",
  ministry: "Ministry of Rural Development",
  launchedYear: 2014,
  category: "Skill Development",
  imageEmoji: "🏭",
  benefits: [
    "Free training",
    "Placement assistance",
    "Industry certifications"
  ],
  applicationUrl: "https://ddugky.gov.in",
  eligibility: {
    occupation: ["Student", "Unemployed"],
    minAge: 15,
    maxAge: 35,
    maxIncome: 300000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "32",
  name: "Rashtriya Swasthya Bima Yojana",
  shortDescription: "Health insurance for below poverty line families.",
  description:
    "Provides cashless insurance for hospitalization expenses to BPL families.",
  ministry: "Ministry of Labour and Employment",
  launchedYear: 2008,
  category: "Health",
  imageEmoji: "🏥",
  benefits: [
    "Cashless treatment",
    "Hospitalization coverage",
    "Financial protection"
  ],
  applicationUrl: "https://labour.gov.in",
  eligibility: {
    occupation: ["Any"],
    minAge: 0,
    maxAge: 99,
    maxIncome: 100000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "33",
  name: "Pradhan Mantri Matru Vandana Yojana",
  shortDescription: "Cash incentive for pregnant and lactating mothers.",
  description:
    "Provides maternity benefits to women for the first living child.",
  ministry: "Ministry of Women and Child Development",
  launchedYear: 2017,
  category: "Women Welfare",
  imageEmoji: "🤱",
  benefits: [
    "Cash assistance",
    "Nutritional support",
    "Maternal healthcare"
  ],
  applicationUrl: "https://wcd.nic.in",
  eligibility: {
    occupation: ["Employee", "Unemployed", "Other"],
    minAge: 19,
    maxAge: 50,
    maxIncome: 99999999,
    gender: ["Female"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "34",
  name: "Balika Samriddhi Yojana",
  shortDescription: "Financial support for girl children.",
  description:
    "Encourages education and welfare of girl children through financial assistance.",
  ministry: "Ministry of Women and Child Development",
  launchedYear: 1997,
  category: "Women Welfare",
  imageEmoji: "👧",
  benefits: [
    "Scholarship support",
    "Savings benefits",
    "Encourages education"
  ],
  applicationUrl: "https://wcd.nic.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 0,
    maxAge: 18,
    maxIncome: 200000,
    gender: ["Female"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "35",
  name: "National Family Benefit Scheme",
  shortDescription: "Financial assistance to bereaved poor families.",
  description:
    "Provides one-time financial assistance to families on the death of the primary breadwinner.",
  ministry: "Ministry of Rural Development",
  launchedYear: 1995,
  category: "Social Security",
  imageEmoji: "🤝",
  benefits: [
    "One-time assistance",
    "Direct benefit transfer",
    "Support during hardship"
  ],
  applicationUrl: "https://nsap.nic.in",
  eligibility: {
    occupation: ["Farmer", "Employee", "Self-Employed", "Unemployed", "Other"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 100000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},
{
  id: "36",
  name: "PM Vishwakarma Yojana",
  shortDescription: "Support scheme for traditional artisans and craftsmen.",
  description:
    "Provides skill training, toolkit incentives, credit support, and market linkage assistance to traditional artisans and craftspeople.",
  ministry: "Ministry of Micro, Small and Medium Enterprises",
  launchedYear: 2023,
  category: "Entrepreneurship",
  imageEmoji: "🛠️",
  benefits: [
    "Skill training",
    "Toolkit incentive",
    "Collateral-free loans"
  ],
  applicationUrl: "https://pmvishwakarma.gov.in",
  eligibility: {
    occupation: ["Self-Employed", "Other"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "37",
  name: "e-Shram",
  shortDescription: "National database for unorganized workers.",
  description:
    "Registers unorganized workers and provides access to social security schemes.",
  ministry: "Ministry of Labour and Employment",
  launchedYear: 2021,
  category: "Social Security",
  imageEmoji: "👷",
  benefits: [
    "Worker identity card",
    "Access to welfare schemes",
    "Accident insurance benefits"
  ],
  applicationUrl: "https://eshram.gov.in",
  eligibility: {
    occupation: ["Farmer", "Self-Employed", "Unemployed", "Other"],
    minAge: 16,
    maxAge: 59,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "38",
  name: "One Nation One Ration Card",
  shortDescription: "Portable ration benefits across India.",
  description:
    "Allows beneficiaries to access subsidized food grains from any ration shop in the country.",
  ministry: "Ministry of Consumer Affairs, Food and Public Distribution",
  launchedYear: 2019,
  category: "Food Security",
  imageEmoji: "🍚",
  benefits: [
    "Nationwide portability",
    "Subsidized food grains",
    "Easy access for migrant workers"
  ],
  applicationUrl: "https://nfsa.gov.in",
  eligibility: {
    occupation: ["Farmer", "Employee", "Self-Employed", "Unemployed", "Other"],
    minAge: 0,
    maxAge: 99,
    maxIncome: 300000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "39",
  name: "National Food Security Act",
  shortDescription: "Provides subsidized food grains to eligible families.",
  description:
    "Ensures access to affordable food grains through the Public Distribution System.",
  ministry: "Ministry of Consumer Affairs, Food and Public Distribution",
  launchedYear: 2013,
  category: "Food Security",
  imageEmoji: "🌾",
  benefits: [
    "Subsidized rice and wheat",
    "Food security",
    "Support for low-income families"
  ],
  applicationUrl: "https://nfsa.gov.in",
  eligibility: {
    occupation: ["Any"],
    minAge: 0,
    maxAge: 99,
    maxIncome: 300000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "40",
  name: "National Career Service",
  shortDescription: "Employment and career guidance platform.",
  description:
    "Provides job matching, career counseling, and employment services.",
  ministry: "Ministry of Labour and Employment",
  launchedYear: 2015,
  category: "Employment",
  imageEmoji: "💼",
  benefits: [
    "Job search assistance",
    "Career counseling",
    "Skill opportunities"
  ],
  applicationUrl: "https://www.ncs.gov.in",
  eligibility: {
    occupation: ["Student", "Unemployed", "Other"],
    minAge: 15,
    maxAge: 60,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "41",
  name: "National Livelihood Mission",
  shortDescription: "Promotes self-employment and SHGs.",
  description:
    "Supports rural poor households through self-help groups and livelihood opportunities.",
  ministry: "Ministry of Rural Development",
  launchedYear: 2011,
  category: "Rural Development",
  imageEmoji: "🤝",
  benefits: [
    "Self-help groups",
    "Financial inclusion",
    "Income generation support"
  ],
  applicationUrl: "https://aajeevika.gov.in",
  eligibility: {
    occupation: ["Farmer", "Self-Employed", "Unemployed"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 300000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "42",
  name: "Mahatma Gandhi National Rural Employment Guarantee Act",
  shortDescription: "Guarantees 100 days of wage employment.",
  description:
    "Provides guaranteed wage employment to rural households seeking unskilled work.",
  ministry: "Ministry of Rural Development",
  launchedYear: 2005,
  category: "Employment",
  imageEmoji: "👨‍🌾",
  benefits: [
    "100 days guaranteed employment",
    "Direct wage payment",
    "Rural livelihood support"
  ],
  applicationUrl: "https://nrega.nic.in",
  eligibility: {
    occupation: ["Farmer", "Unemployed", "Other"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "43",
  name: "PM Poshan Scheme",
  shortDescription: "Mid-day meal program for school children.",
  description:
    "Provides nutritious meals to children studying in government and aided schools.",
  ministry: "Ministry of Education",
  launchedYear: 2021,
  category: "Education",
  imageEmoji: "🍱",
  benefits: [
    "Free nutritious meals",
    "Improved attendance",
    "Better child health"
  ],
  applicationUrl: "https://education.gov.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 5,
    maxAge: 14,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "44",
  name: "UDAAN",
  shortDescription: "Scholarship and mentoring program for girls.",
  description:
    "Encourages girls to pursue higher education in science and engineering.",
  ministry: "Ministry of Education",
  launchedYear: 2014,
  category: "Education",
  imageEmoji: "✈️",
  benefits: [
    "Study material",
    "Mentorship",
    "Career guidance"
  ],
  applicationUrl: "https://www.nta.ac.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 15,
    maxAge: 19,
    maxIncome: 600000,
    gender: ["Female"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "45",
  name: "PM eVIDYA",
  shortDescription: "Digital education initiative.",
  description:
    "Provides online and digital learning resources for students across India.",
  ministry: "Ministry of Education",
  launchedYear: 2020,
  category: "Education",
  imageEmoji: "💻",
  benefits: [
    "Online learning",
    "Educational TV channels",
    "Digital resources"
  ],
  applicationUrl: "https://diksha.gov.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 5,
    maxAge: 30,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "46",
  name: "National Digital Health Mission",
  shortDescription: "Digital health ecosystem for citizens.",
  description:
    "Provides digital health IDs and secure health record management.",
  ministry: "Ministry of Health and Family Welfare",
  launchedYear: 2020,
  category: "Health",
  imageEmoji: "🩺",
  benefits: [
    "Digital health ID",
    "Online records",
    "Easy healthcare access"
  ],
  applicationUrl: "https://abdm.gov.in",
  eligibility: {
    occupation: ["Any"],
    minAge: 0,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "47",
  name: "Pradhan Mantri Garib Kalyan Anna Yojana",
  shortDescription: "Free food grains for eligible beneficiaries.",
  description:
    "Provides free food grains to eligible households under food security programs.",
  ministry: "Ministry of Consumer Affairs, Food and Public Distribution",
  launchedYear: 2020,
  category: "Food Security",
  imageEmoji: "🥖",
  benefits: [
    "Free ration",
    "Food security",
    "Support during hardship"
  ],
  applicationUrl: "https://nfsa.gov.in",
  eligibility: {
    occupation: ["Any"],
    minAge: 0,
    maxAge: 99,
    maxIncome: 300000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "48",
  name: "National Handicraft Development Programme",
  shortDescription: "Support for handicraft artisans.",
  description:
    "Provides training, design support, marketing assistance and financial aid to artisans.",
  ministry: "Ministry of Textiles",
  launchedYear: 2015,
  category: "Entrepreneurship",
  imageEmoji: "🎨",
  benefits: [
    "Skill upgradation",
    "Marketing support",
    "Financial assistance"
  ],
  applicationUrl: "https://handicrafts.nic.in",
  eligibility: {
    occupation: ["Self-Employed", "Other"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "49",
  name: "National Bamboo Mission",
  shortDescription: "Promotes bamboo cultivation and industry.",
  description:
    "Supports bamboo plantation, processing units, and value chain development.",
  ministry: "Ministry of Agriculture & Farmers Welfare",
  launchedYear: 2018,
  category: "Agriculture",
  imageEmoji: "🎋",
  benefits: [
    "Financial assistance",
    "Market support",
    "Skill development"
  ],
  applicationUrl: "https://nbm.nic.in",
  eligibility: {
    occupation: ["Farmer"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "50",
  name: "Pradhan Mantri Krishi Sinchayee Yojana",
  shortDescription: "Improves irrigation coverage and water use efficiency.",
  description:
    "Promotes irrigation infrastructure and efficient water management in agriculture.",
  ministry: "Ministry of Agriculture & Farmers Welfare",
  launchedYear: 2015,
  category: "Agriculture",
  imageEmoji: "💧",
  benefits: [
    "Improved irrigation",
    "Water conservation",
    "Higher crop productivity"
  ],
  applicationUrl: "https://pmksy.gov.in",
  eligibility: {
    occupation: ["Farmer"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},
{
  id: "51",
  name: "National Horticulture Mission",
  shortDescription: "Promotes holistic growth of the horticulture sector.",
  description: "Provides financial assistance for horticulture production, post-harvest management, and marketing infrastructure.",
  ministry: "Ministry of Agriculture & Farmers Welfare",
  launchedYear: 2005,
  category: "Agriculture",
  imageEmoji: "🍎",
  benefits: [
    "Financial assistance",
    "Improved productivity",
    "Market support"
  ],
  applicationUrl: "https://nhm.gov.in",
  eligibility: {
    occupation: ["Farmer"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "52",
  name: "Paramparagat Krishi Vikas Yojana",
  shortDescription: "Promotes organic farming practices.",
  description: "Encourages farmers to adopt organic farming through cluster-based approaches.",
  ministry: "Ministry of Agriculture & Farmers Welfare",
  launchedYear: 2015,
  category: "Agriculture",
  imageEmoji: "🌱",
  benefits: [
    "Organic farming support",
    "Certification assistance",
    "Better market value"
  ],
  applicationUrl: "https://pgsindia-ncof.gov.in",
  eligibility: {
    occupation: ["Farmer"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "53",
  name: "National Beekeeping and Honey Mission",
  shortDescription: "Promotes scientific beekeeping and honey production.",
  description: "Supports beekeepers with training, equipment, and infrastructure development.",
  ministry: "Ministry of Agriculture & Farmers Welfare",
  launchedYear: 2020,
  category: "Agriculture",
  imageEmoji: "🐝",
  benefits: [
    "Training support",
    "Equipment assistance",
    "Income generation"
  ],
  applicationUrl: "https://nbhm.gov.in",
  eligibility: {
    occupation: ["Farmer", "Self-Employed"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "54",
  name: "National Scheme of Incentive to Girls for Secondary Education",
  shortDescription: "Encourages girls to continue secondary education.",
  description: "Provides financial incentives to girls belonging to disadvantaged groups.",
  ministry: "Ministry of Education",
  launchedYear: 2008,
  category: "Education",
  imageEmoji: "🎒",
  benefits: [
    "Financial incentive",
    "Supports secondary education",
    "Promotes girl child education"
  ],
  applicationUrl: "https://education.gov.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 14,
    maxAge: 18,
    maxIncome: 300000,
    gender: ["Female"],
    category: ["SC", "ST"],
    states: ["All"]
  }
},

{
  id: "55",
  name: "INSPIRE Scholarship",
  shortDescription: "Scholarship for students pursuing science education.",
  description: "Encourages talented students to pursue careers in science and research.",
  ministry: "Department of Science and Technology",
  launchedYear: 2008,
  category: "Education",
  imageEmoji: "🔬",
  benefits: [
    "Annual scholarship",
    "Research opportunities",
    "Science career support"
  ],
  applicationUrl: "https://online-inspire.gov.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 17,
    maxAge: 25,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "56",
  name: "PM CARES for Children Scheme",
  shortDescription: "Support for children who lost parents.",
  description: "Provides financial support, education, and healthcare to orphaned children.",
  ministry: "Ministry of Women and Child Development",
  launchedYear: 2021,
  category: "Social Security",
  imageEmoji: "🧒",
  benefits: [
    "Financial assistance",
    "Education support",
    "Health insurance"
  ],
  applicationUrl: "https://pmcaresforchildren.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 0,
    maxAge: 23,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "57",
  name: "National Creche Scheme",
  shortDescription: "Daycare facilities for children of working mothers.",
  description: "Provides safe childcare services and nutrition support.",
  ministry: "Ministry of Women and Child Development",
  launchedYear: 2017,
  category: "Women Welfare",
  imageEmoji: "👶",
  benefits: [
    "Daycare facilities",
    "Nutrition support",
    "Early childhood care"
  ],
  applicationUrl: "https://wcd.nic.in",
  eligibility: {
    occupation: ["Employee", "Self-Employed"],
    minAge: 0,
    maxAge: 6,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "58",
  name: "National Social Assistance Programme",
  shortDescription: "Social assistance for vulnerable groups.",
  description: "Provides pensions and financial support to elderly, widows, and disabled persons.",
  ministry: "Ministry of Rural Development",
  launchedYear: 1995,
  category: "Social Security",
  imageEmoji: "🤝",
  benefits: [
    "Pension support",
    "Direct benefit transfer",
    "Financial assistance"
  ],
  applicationUrl: "https://nsap.nic.in",
  eligibility: {
    occupation: ["Unemployed", "Other"],
    minAge: 18,
    maxAge: 99,
    maxIncome: 100000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "59",
  name: "Pradhan Mantri Uchchatar Shiksha Protsahan Yojana",
  shortDescription: "Scholarship for higher education students.",
  description: "Provides scholarships to meritorious students pursuing higher education.",
  ministry: "Ministry of Education",
  launchedYear: 2014,
  category: "Education",
  imageEmoji: "🎓",
  benefits: [
    "Scholarship support",
    "Higher education assistance",
    "Merit-based selection"
  ],
  applicationUrl: "https://scholarships.gov.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 17,
    maxAge: 30,
    maxIncome: 800000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "60",
  name: "Skill India Mission",
  shortDescription: "Enhances employability through skill training.",
  description: "Provides industry-relevant skill training and certification.",
  ministry: "Ministry of Skill Development and Entrepreneurship",
  launchedYear: 2015,
  category: "Skill Development",
  imageEmoji: "⚙️",
  benefits: [
    "Skill training",
    "Certification",
    "Employment opportunities"
  ],
  applicationUrl: "https://skillindia.gov.in",
  eligibility: {
    occupation: ["Student", "Unemployed"],
    minAge: 15,
    maxAge: 45,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "61",
  name: "National Urban Livelihoods Mission",
  shortDescription: "Reduces urban poverty through self-employment.",
  description: "Provides skill development and self-employment opportunities to urban poor.",
  ministry: "Ministry of Housing and Urban Affairs",
  launchedYear: 2013,
  category: "Employment",
  imageEmoji: "🏙️",
  benefits: [
    "Skill training",
    "Self-employment support",
    "Financial inclusion"
  ],
  applicationUrl: "https://nulm.gov.in",
  eligibility: {
    occupation: ["Unemployed", "Self-Employed"],
    minAge: 18,
    maxAge: 60,
    maxIncome: 300000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "62",
  name: "PM Internship Scheme",
  shortDescription: "Internship opportunities for youth in top companies.",
  description: "Provides internship opportunities to students and young professionals.",
  ministry: "Ministry of Corporate Affairs",
  launchedYear: 2024,
  category: "Employment",
  imageEmoji: "🏢",
  benefits: [
    "Industry exposure",
    "Monthly stipend",
    "Skill development"
  ],
  applicationUrl: "https://pminternship.mca.gov.in",
  eligibility: {
    occupation: ["Student", "Unemployed"],
    minAge: 18,
    maxAge: 24,
    maxIncome: 800000,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "63",
  name: "National Youth Corps",
  shortDescription: "Volunteer program for youth development.",
  description: "Engages youth in nation-building and community service activities.",
  ministry: "Ministry of Youth Affairs and Sports",
  launchedYear: 2010,
  category: "Youth Development",
  imageEmoji: "🇮🇳",
  benefits: [
    "Leadership development",
    "Volunteer opportunities",
    "Community engagement"
  ],
  applicationUrl: "https://yas.nic.in",
  eligibility: {
    occupation: ["Student", "Unemployed"],
    minAge: 18,
    maxAge: 29,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "64",
  name: "National Sports Talent Search Scheme",
  shortDescription: "Identifies and nurtures young sporting talent.",
  description: "Provides support and training for talented athletes.",
  ministry: "Ministry of Youth Affairs and Sports",
  launchedYear: 2015,
  category: "Sports",
  imageEmoji: "🏅",
  benefits: [
    "Sports training",
    "Scholarships",
    "Coaching support"
  ],
  applicationUrl: "https://sportsauthorityofindia.nic.in",
  eligibility: {
    occupation: ["Student"],
    minAge: 8,
    maxAge: 18,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},

{
  id: "65",
  name: "Khelo India Scheme",
  shortDescription: "Promotes sports culture and talent development.",
  description: "Supports grassroots sports development and athlete training.",
  ministry: "Ministry of Youth Affairs and Sports",
  launchedYear: 2018,
  category: "Sports",
  imageEmoji: "🏃",
  benefits: [
    "Sports infrastructure",
    "Athlete scholarships",
    "Training support"
  ],
  applicationUrl: "https://kheloindia.gov.in",
  eligibility: {
    occupation: ["Student", "Other"],
    minAge: 8,
    maxAge: 30,
    maxIncome: 99999999,
    gender: ["Male", "Female", "Other"],
    category: ["General", "OBC", "SC", "ST"],
    states: ["All"]
  }
},
  
];

export default schemes;
