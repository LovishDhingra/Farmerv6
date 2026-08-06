import { Router, type IRouter } from "express";

const router: IRouter = Router();

export interface EducationModule {
  id: number;
  title: string;
  description: string;
  category: "market" | "crop" | "finance" | "rights" | "technology";
  difficulty: "beginner" | "intermediate" | "advanced";
  durationMinutes: number;
  emoji: string;
  lessons: EducationLesson[];
}

export interface EducationLesson {
  id: number;
  title: string;
  content: string;
  keyTakeaways: string[];
}

const EDUCATION_MODULES: EducationModule[] = [
  {
    id: 1,
    title: "Understanding MSP — Your Price Safety Net",
    description:
      "Learn what Minimum Support Price is, how it is calculated, which crops it covers, and how to ensure you receive at least MSP for your produce.",
    category: "market",
    difficulty: "beginner",
    durationMinutes: 15,
    emoji: "⚖️",
    lessons: [
      {
        id: 1,
        title: "What is MSP?",
        content:
          "Minimum Support Price (MSP) is the price the government guarantees to buy your crops at, regardless of what the market is offering. It acts as a price floor — the lowest price you should accept. The CCEA announces MSP before each season based on a formula that includes your production cost (A2+FL cost), plus a 50% profit margin.",
        keyTakeaways: [
          "MSP is set before each season — check the latest rates before selling",
          "Currently covers 23 crops including wheat, paddy, pulses, oilseeds, and cotton",
          "You have the right to sell to government procurement agencies at MSP",
          "Private traders are not legally bound to pay MSP, but you can choose not to sell below it",
        ],
      },
      {
        id: 2,
        title: "How to Sell at MSP",
        content:
          "Government procures crops at MSP through agencies like FCI (wheat/rice), NAFED (pulses/oilseeds), and Cotton Corporation of India. Procurement centres are opened in mandis during the harvest season. You need to register and bring required documents. Payment is made directly to your bank account within 48 hours.",
        keyTakeaways: [
          "Register at your nearest mandi office before the procurement season begins",
          "Documents needed: land record (Khasra), bank passbook, Aadhaar card",
          "Arrive early in the season — procurement centres close once targets are met",
          "If your mandi has no procurement, file a complaint with the District Collector",
        ],
      },
      {
        id: 3,
        title: "When Markets Pay Less Than MSP",
        content:
          "Under PM-AASHA and PDPS (Price Deficiency Payment Scheme), if market prices for oilseeds and pulses fall below MSP, the state government pays you the difference directly. You must register before the season and sell in a registered mandi. Wheat and paddy have direct government procurement — do not sell below MSP to private buyers.",
        keyTakeaways: [
          "PM-AASHA covers oilseeds, pulses, and copra — register before harvest",
          "Keep all mandi sale receipts (sale slips) as proof for deficiency payment claims",
          "Report MSP violations to Kisan Call Centre (1800-180-1551)",
          "Your state's agriculture department website lists active procurement centres",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Reading the Mandi — Price Discovery for Beginners",
    description:
      "Understand how mandi prices are set, what modal price means, how to compare prices across mandis, and how to time your sale for maximum profit.",
    category: "market",
    difficulty: "beginner",
    durationMinutes: 20,
    emoji: "📊",
    lessons: [
      {
        id: 1,
        title: "How Mandi Auctions Work",
        content:
          "In an APMC mandi, your produce is auctioned in front of multiple commission agents (arthiyas) and traders. The highest bidder gets the produce. The key prices reported are: Minimum (lowest bid), Maximum (highest bid), and Modal (the price at which the maximum quantity was traded). Modal price is the most meaningful number for you.",
        keyTakeaways: [
          "Modal price = the price most of your neighbours got — aim to meet or beat it",
          "Arrive early morning — fresh produce fetches 5-10% higher prices",
          "Clean, graded, dry produce always commands a premium — sort before selling",
          "Watch 3-4 lots sold before yours to understand the day's price range",
        ],
      },
      {
        id: 2,
        title: "Comparing Prices Across Mandis",
        content:
          "Mandi prices for the same crop can vary by 15-25% across districts. Using e-NAM, Agmarknet, or FarmSphere's Price Explorer, you can check which nearby mandi is offering the best price. Factor in transport cost (typically ₹80-150/quintal/100km) before deciding to sell at a distant mandi.",
        keyTakeaways: [
          "Check at least 3 nearby mandis before deciding where to sell",
          "Transport cost eats into price advantage — calculate net price after transport",
          "Prices on day 1-2 of the week are often higher due to lower arrivals",
          "Avoid selling on days of major arrivals in your crop — prices drop on high-supply days",
        ],
      },
      {
        id: 3,
        title: "When to Hold and When to Sell",
        content:
          "Selling immediately after harvest means competing with thousands of farmers selling simultaneously, which crashes prices. If you can store produce safely for 2-3 months, prices typically rise 10-20% post-harvest. Warehouse receipt financing (under NWR) lets you pledge stored grain for a loan to cover immediate cash needs while waiting for better prices.",
        keyTakeaways: [
          "Post-harvest months (Oct-Dec for Kharif, Apr-Jun for Rabi) are lowest price months",
          "Prices typically rise 15-20% by Jan-Mar for Kharif crops and Sep-Nov for Rabi",
          "Warehouse Receipt (NWR) loans available at 7-8% interest — cheaper than selling low",
          "Gramin Bhandaran Yojana provides subsidy to build on-farm storage",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Crop Insurance — Protecting Your Livelihood",
    description:
      "Everything you need to know about PMFBY — how to enrol, what is covered, how to file claims, and how to get your money quickly.",
    category: "finance",
    difficulty: "beginner",
    durationMinutes: 18,
    emoji: "🛡️",
    lessons: [
      {
        id: 1,
        title: "What PMFBY Covers",
        content:
          "PMFBY covers crop loss from natural calamities (flood, drought, cyclone, hailstorm, pest attacks, and diseases). It covers three stages: sowing failure (if you couldn't sow due to drought), standing crop loss, and post-harvest losses for crops left in the field for drying. Premium is just 2% for Kharif, 1.5% for Rabi crops.",
        keyTakeaways: [
          "Coverage starts from sowing — enrol before the cutoff date (usually 15 days after sowing)",
          "Post-harvest losses covered for 14 days after cutting/harvest",
          "Localised calamities (hailstorm, landslide) assessed at individual field level",
          "Prevented sowing due to drought or flood also compensated",
        ],
      },
      {
        id: 2,
        title: "How to Enrol",
        content:
          "Loanee farmers (who took crop loans from banks) are automatically enrolled — confirm with your bank. Non-loanee farmers can enrol at: Common Service Centre (CSC), bank branches, or online at https://pmfby.gov.in. You need: land record, Aadhaar, bank account, and sowing declaration. Enrol before the cutoff date declared by your state.",
        keyTakeaways: [
          "Check with your bank if you have a crop loan — you may already be enrolled",
          "Non-loanee farmers must actively enrol — it is NOT automatic for you",
          "Missing the enrolment deadline means no coverage for that season",
          "Online enrolment takes 15 minutes at pmfby.gov.in",
        ],
      },
      {
        id: 3,
        title: "Filing a Claim After Crop Loss",
        content:
          "If you suffer crop loss: (1) Report within 72 hours of the calamity by calling the insurance company helpline or visiting your bank/CSC. (2) Take photos/video of the damaged crop. (3) Inform your village headman (Sarpanch) who will countersign. Claims for widespread losses are settled based on crop-cutting experiments conducted by state agriculture departments. For localised losses, a field inspection will be conducted.",
        keyTakeaways: [
          "Report crop loss within 72 hours — after that, claim may be rejected",
          "Photograph everything with timestamp and GPS location",
          "Keep your insurance policy document and enrolment receipt safe",
          "Complaints about claim delays can be filed at Krishi Rakshak portal",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Your Legal Rights as a Farmer",
    description:
      "Know your rights in the mandi — weighing, grading, payment timelines, and what to do when commission agents or traders violate them.",
    category: "rights",
    difficulty: "beginner",
    durationMinutes: 22,
    emoji: "⚖️",
    lessons: [
      {
        id: 1,
        title: "Rights at the Mandi",
        content:
          "Under APMC Acts, you have the right to: (1) Sell in any APMC mandi in India — you are not restricted to your district mandi. (2) Demand that weighing be done in your presence. (3) Inspect and challenge the weights (calibration certificate must be displayed). (4) Receive a sale receipt (sale slip/pakka bill) immediately after sale, showing quantity, rate, and deductions. (5) Receive payment within 3 working days of sale.",
        keyTakeaways: [
          "Always demand your pakka bill (sale receipt) — never leave without it",
          "Check weighbridge calibration certificate — it must be current",
          "You can request re-weighing if you suspect short-weight",
          "File complaint with APMC secretary if payment is delayed beyond 3 days",
        ],
      },
      {
        id: 2,
        title: "Permissible Deductions — What Can They Actually Deduct?",
        content:
          "Commission agents (arthiyas) can only charge the commission rate fixed by the APMC. Typical rates: Punjab 2.5%, Maharashtra 1-2%, MP 1%. Additional market fee (0.5-2%) is charged by APMC. Any deduction for 'moisture', 'cleaning', or 'dhara' beyond the APMC-specified limit is illegal. Always check the approved deduction schedule displayed at the mandi office.",
        keyTakeaways: [
          "Ask for the APMC's approved deduction schedule before selling",
          "Commission rates are fixed by law — excessive commissions are illegal",
          "Deductions for moisture/cleaning must be based on actual testing, not estimates",
          "Report illegal deductions to District Agriculture Officer",
        ],
      },
      {
        id: 3,
        title: "Grievance Redressal — Who to Call",
        content:
          "If your rights are violated: Kisan Call Centre (1800-180-1551, free, 24/7, available in 22 languages), District Collector's office, State APMC Board, National Consumer Helpline (1800-11-4000). For MSP violations, the state government's procurement agency must respond within 7 days. For financial fraud by commission agents, file an FIR at the local police station — it is a cognizable offence.",
        keyTakeaways: [
          "Kisan Call Centre: 1800-180-1551 — free, 24/7, in your language",
          "Keep a copy of all sale slips, receipts, and written communications",
          "Financial fraud by arthiyas is a criminal offence — police must register FIR",
          "State APMC boards have an online complaint portal — use it for mandi grievances",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Smart Soil Management",
    description:
      "Learn how to test your soil, interpret results, and apply fertilisers efficiently to cut input costs by 20-30% while maintaining or improving yields.",
    category: "crop",
    difficulty: "intermediate",
    durationMinutes: 25,
    emoji: "🌱",
    lessons: [
      {
        id: 1,
        title: "Soil Testing — Why and How",
        content:
          "Soil testing tells you exactly which nutrients your soil has in excess and which are deficient, so you don't waste money on unnecessary fertilisers. Test once every 2-3 years or after a change in crop pattern. Collect 8-10 samples from different spots in the field, mix them, and send 500g to your nearest Soil Testing Lab (usually free under Soil Health Card Scheme).",
        keyTakeaways: [
          "Soil testing is free under the Soil Health Card Scheme at government labs",
          "Collect soil from 6 inches depth, avoiding field edges and recent fertiliser spots",
          "Test before sowing — results take 2-3 weeks",
          "Soil Health Card gives specific fertiliser dose for your soil — follow it",
        ],
      },
      {
        id: 2,
        title: "Reading Your Soil Health Card",
        content:
          "The card shows NPK (Nitrogen, Phosphorus, Potassium) status plus secondary nutrients (Sulphur, Zinc, Iron) and pH. Red means deficient, yellow means moderate, green means sufficient. Only apply fertiliser for deficient nutrients. If your card says Phosphorus is green, skip DAP and use only urea — you'll save ₹1,200-1,500/acre.",
        keyTakeaways: [
          "Only fertilise what is deficient — over-application wastes money and damages soil",
          "Zinc deficiency (very common in Punjab/UP) causes 20-30% yield loss — easy to fix with ZnSO4",
          "High pH soil (alkaline) locks away micronutrients — gypsum application helps",
          "Organic matter below 0.5% means soil needs compost/FYM — no fertiliser can replace it",
        ],
      },
      {
        id: 3,
        title: "Efficient Fertiliser Application",
        content:
          "Split application increases efficiency dramatically: apply 1/3 nitrogen at sowing, 1/3 at first irrigation (21 days), and 1/3 at second irrigation (42 days). This prevents leaching and improves uptake. Micro-dose fertiliser application (5g urea per plant in furrow at sowing) can substitute 25-30% of top-dressing. Liquid urea via drip irrigation for cotton/vegetables increases efficiency by 40%.",
        keyTakeaways: [
          "Split urea into 3 doses — never apply all nitrogen at once",
          "Leaf colour charts (LCC) tell you exactly when to apply nitrogen — get one free from KVK",
          "Organic fertilisers (FYM, vermicompost) reduce chemical fertiliser need by 25%",
          "Nano urea (liquid, IFFCO) can replace 50% of bagged urea at lower cost",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Digital Tools Every Farmer Should Know",
    description:
      "Practical guide to free government apps and portals that can save you money, improve decisions, and connect you to benefits.",
    category: "technology",
    difficulty: "beginner",
    durationMinutes: 12,
    emoji: "📲",
    lessons: [
      {
        id: 1,
        title: "Must-Have Free Apps",
        content:
          "Meghdoot (IMD + ICAR): 5-day weather forecast and crop advisories specific to your block. Kisan Suvidha: weather, MSP rates, plant protection advisories, dealer locator — all in one. PMKSY Mobile App: check your PM-KISAN instalment status. Crop Insurance App: enrol in PMFBY, check claim status. m-Kisan: receive SMS advisories from scientists in your local language.",
        keyTakeaways: [
          "Meghdoot: block-level 5-day weather + pest advisory — download from Play Store",
          "Kisan Suvidha: MSP rates, market prices, input dealer locator — all free",
          "PMKISAN app: check if your ₹2,000 instalment has been credited",
          "All apps available in Hindi and regional languages — no English needed",
        ],
      },
      {
        id: 2,
        title: "Useful Websites",
        content:
          "Agmarknet.gov.in: daily mandi prices for 3,000+ markets across India — bookmark this. eNAM.gov.in: register and sell online in 1,260+ connected mandis. PMFBY.gov.in: crop insurance enrolment and claim status. Soilhealth.dac.gov.in: download your Soil Health Card. IMD.gov.in: district-level rainfall data and seasonal forecasts.",
        keyTakeaways: [
          "Agmarknet: check mandi prices for any crop in any district — daily updates",
          "Common Service Centre (CSC) in your village can help with all online registrations",
          "Save these websites as bookmarks on your phone's browser",
          "KVK (Krishi Vigyan Kendra) in your district gives free training on digital tools",
        ],
      },
    ],
  },
];

router.get("/education", (req, res): void => {
  const { category } = req.query;
  let modules = [...EDUCATION_MODULES];

  if (category && typeof category === "string") {
    modules = modules.filter((m) => m.category === category);
  }

  // Return modules without full lesson content for the list view
  const summary = modules.map(({ lessons, ...m }) => ({
    ...m,
    lessonCount: lessons.length,
  }));

  res.json(summary);
});

router.get("/education/:id", (req, res): void => {
  const id = parseInt(req.params.id, 10);
  const module = EDUCATION_MODULES.find((m) => m.id === id);

  if (!module) {
    res.status(404).json({ error: "Module not found" });
    return;
  }

  res.json(module);
});

export default router;
