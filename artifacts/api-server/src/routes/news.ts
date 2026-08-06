import { Router, type IRouter } from "express";

const router: IRouter = Router();

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: "policy" | "market" | "technology" | "weather" | "advisory";
  tags: string[];
  source: string;
  publishedAt: string;
  imageEmoji: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "Government Raises MSP for Kharif Crops by Average 5.4% for 2025-26",
    summary:
      "The Cabinet Committee on Economic Affairs (CCEA) has approved an increase in Minimum Support Price for 17 Kharif crops for marketing season 2025-26.",
    content:
      "The CCEA, chaired by the Prime Minister, approved increases ranging from 2% to 10% across crops. Paddy MSP has been raised to ₹2,300/quintal (up ₹117), while Bajra sees the highest increase at ₹2,625/quintal. Farmers are encouraged to register on PM-KISAN portal to stay updated on procurement drives in their district.",
    category: "policy",
    tags: ["MSP", "Kharif", "CCEA", "Paddy", "Wheat"],
    source: "Ministry of Agriculture & Farmers Welfare",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🌾",
  },
  {
    id: 2,
    title: "e-NAM Platform Crosses 1.8 Crore Registered Farmers Milestone",
    summary:
      "The National Agriculture Market (e-NAM) platform now has over 1.8 crore registered farmers across 1,260 mandis, enabling transparent price discovery and direct payments.",
    content:
      "The platform processed over ₹2.3 lakh crore worth of trade in the last financial year. Farmers using e-NAM report 12-18% better price realisation compared to traditional mandi sales. The platform now supports quality assaying at 585 mandis, reducing disputes about produce quality.",
    category: "technology",
    tags: ["e-NAM", "Digital", "Mandi", "Price Discovery"],
    source: "Small Farmers Agribusiness Consortium",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "📱",
  },
  {
    id: 3,
    title: "IMD Predicts Above-Normal Monsoon for Most of India in 2025",
    summary:
      "The India Meteorological Department forecast for SW Monsoon 2025 shows 104% of Long-Period Average (LPA) rainfall, with strong prospects for Kharif sowing.",
    content:
      "IMD's seasonal forecast indicates above-normal rainfall (>104% LPA) for most of northwest, central, and peninsular India. However, some parts of northeast India and Uttarakhand may see below-normal rainfall. Farmers in rain-fed areas should plan for early sowing of Kharif crops like paddy, maize, and soybean. Adequate soil moisture monitoring is advised.",
    category: "weather",
    tags: ["Monsoon", "IMD", "Kharif", "Rainfall", "Forecast"],
    source: "India Meteorological Department",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🌧️",
  },
  {
    id: 4,
    title: "NABARD Launches ₹50,000 Crore Fund for FPO Lending",
    summary:
      "NABARD has launched a dedicated credit facility to provide affordable working capital to Farmer Producer Organisations (FPOs) for input procurement and produce aggregation.",
    content:
      "The fund will lend at 7-8% interest to registered FPOs, significantly lower than market rates of 12-14%. FPOs must have at least 300 members and 3 years of operation to qualify. Loans up to ₹2 crore can be used for seed procurement, post-harvest infrastructure, and working capital. Applications can be submitted through district NABARD offices.",
    category: "policy",
    tags: ["NABARD", "FPO", "Credit", "Finance", "Cooperative"],
    source: "NABARD",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🏦",
  },
  {
    id: 5,
    title: "Punjab Wheat Procurement Reaches 128 Lakh MT — Highest in 5 Years",
    summary:
      "The Rabi 2025 wheat procurement season in Punjab has been declared the most successful in five years, with direct payments of ₹28,500 crore credited to farmers' accounts.",
    content:
      "Over 8.5 lakh farmers participated in government procurement this season, with 100% payment made within 48 hours of delivery through DBT. The state government's decision to open 1,800 procurement centres (up from 1,200 last year) helped reduce queuing time significantly. Farmers in border districts benefited most from new digital weighbridge installations.",
    category: "market",
    tags: ["Wheat", "Procurement", "Punjab", "Rabi", "DBT"],
    source: "Punjab Mandi Board",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🚜",
  },
  {
    id: 6,
    title: "Cotton Farmers in Vidarbha Get ₹5,000/Hectare Bonus Incentive",
    summary:
      "Maharashtra government announces additional support for cotton farmers in Vidarbha as part of agrarian distress relief package ahead of Kharif season.",
    content:
      "The Maharashtra government's ₹5,000/hectare incentive for cotton farmers in Vidarbha's 11 districts aims to cover part of rising input costs. The incentive is payable to farmers cultivating 0.2 hectares to 4 hectares. Combined with PM-KISAN, a farmer with 2 hectares of cotton will receive ₹16,000 in total government transfers this year.",
    category: "policy",
    tags: ["Cotton", "Maharashtra", "Vidarbha", "Subsidy", "Kharif"],
    source: "Maharashtra Agriculture Department",
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🌿",
  },
  {
    id: 7,
    title: "Drone Spraying Adoption Surges — 3 Lakh Hectares Covered in Kharif 2024",
    summary:
      "Agricultural drone usage for pesticide and fertiliser spraying has grown 400% year-on-year, covering 3 lakh hectares across 12 states, saving farmers time and reducing chemical use.",
    content:
      "Under the Sub-Mission on Agricultural Mechanization (SMAM), 50% subsidy on drone purchase (up to ₹4 lakh for FPOs) has driven rapid adoption. Studies show drone spraying reduces pesticide consumption by 20-30% and cuts labour costs by ₹600-800/acre. Maharashtra, Andhra Pradesh, and Punjab lead in adoption. ICAR is certifying drone operators through 3-day training programmes.",
    category: "technology",
    tags: ["Drone", "Technology", "Precision Farming", "Pesticide", "SMAM"],
    source: "ICAR",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🚁",
  },
  {
    id: 8,
    title: "Onion Export Ban Lifted — Prices Expected to Recover",
    summary:
      "The Ministry of Commerce has removed the export ban on onions with immediate effect, following a significant build-up of stocks and stabilisation of domestic retail prices.",
    content:
      "The export ban, which had been in place since November 2024, suppressed farmgate prices to below ₹800/quintal in Nashik and Solapur districts. With the ban now lifted, traders expect export demand to push prices to ₹1,400-1,600/quintal within 2-3 weeks. Farmers who stored onions in anticipation of this announcement stand to benefit significantly.",
    category: "market",
    tags: ["Onion", "Export", "Nashik", "Trade Policy", "Price Recovery"],
    source: "Directorate General of Foreign Trade",
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🧅",
  },
  {
    id: 9,
    title: "New Variety of Heat-Tolerant Wheat Released by ICAR-IIWBR",
    summary:
      "ICAR-Indian Institute of Wheat and Barley Research has released 'DBW 370', a new wheat variety that maintains 90% yield even when temperatures rise 2-3°C above normal during grain-filling.",
    content:
      "DBW 370 completes grain-filling 5-7 days earlier than HD 2967, allowing farmers to escape terminal heat stress. In multi-location trials across Punjab, Haryana, and UP, it yielded 58-62 quintals/hectare under normal conditions and 54-58 q/ha under heat stress — compared to 45-48 q/ha for standard varieties. Seed will be available from registered nurseries from October 2025.",
    category: "advisory",
    tags: ["Wheat", "New Variety", "ICAR", "Heat Tolerance", "Seed"],
    source: "ICAR-IIWBR Karnal",
    publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🌱",
  },
  {
    id: 10,
    title: "Pink Bollworm Attack Alert Issued for Gujarat and Maharashtra Cotton Belt",
    summary:
      "State agriculture departments issue early warning for pink bollworm (Pectinophora gossypiella) infestation in cotton crops across Saurashtra, Kutch, and Vidarbha regions.",
    content:
      "Field surveys have detected pheromone trap catches exceeding 8 moths/trap/week — the economic threshold is 5. Farmers are advised to: (1) Install pheromone traps at 5/acre, (2) Apply spinosad or emamectin benzoate if pest counts exceed threshold, (3) Avoid late picking which increases infestation risk. Bt cotton showing resistance should be reported to the nearest Krishi Vigyan Kendra.",
    category: "advisory",
    tags: ["Cotton", "Pest Alert", "Pink Bollworm", "Gujarat", "Maharashtra"],
    source: "State Department of Agriculture",
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "⚠️",
  },
  {
    id: 11,
    title: "Soil Carbon Credits — Indian Farmers Can Now Earn from Sustainable Practices",
    summary:
      "A pilot programme by the Indian Carbon Market allows farmers adopting zero-tillage, cover cropping, and biochar application to earn carbon credits tradeable on the ICM exchange.",
    content:
      "Farmers sequestering at least 0.5 tonnes of carbon/hectare/year can earn credits priced at ₹800-1,200/tonne. The pilot covers 50,000 farmers across Haryana, UP, and MP. Third-party verification is mandatory and costs are borne by the programme for the first 3 years. Carbon income can supplement farm revenue by ₹400-600/acre without changing cropping patterns.",
    category: "technology",
    tags: ["Carbon Credits", "Sustainable Farming", "Zero Tillage", "Income"],
    source: "Bureau of Energy Efficiency",
    publishedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🌍",
  },
  {
    id: 12,
    title: "Agri Stack Digital ID — Farmers Can Now Access All Benefits with One Card",
    summary:
      "The Agri Stack initiative has linked PM-KISAN, KCC, PMFBY, and state subsidy databases to a single Farmer Registry ID, enabling frictionless benefit delivery.",
    content:
      "Over 8 crore farmers have been issued unique Farmer IDs linked to their Aadhaar, land records, and bank accounts. Banks can now instantly verify KCC eligibility, state departments can process subsidy claims in 48 hours instead of 6 weeks, and insurance companies can settle PMFBY claims with satellite-verified crop loss data. Farmers can check their ID status at https://agristack.gov.in.",
    category: "technology",
    tags: ["Digital", "Agri Stack", "Farmer ID", "KCC", "PMFBY"],
    source: "Ministry of Agriculture & Farmers Welfare",
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    imageEmoji: "🪪",
  },
];

router.get("/news", (req, res): void => {
  const { category, limit } = req.query;
  let articles = [...NEWS_ARTICLES];

  if (category && typeof category === "string") {
    articles = articles.filter((a) => a.category === category);
  }

  const limitNum = limit ? Math.min(parseInt(String(limit), 10) || 12, 50) : 12;
  articles = articles.slice(0, limitNum);

  res.json(articles);
});

export default router;
