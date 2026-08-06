import { Router, type IRouter } from "express";
import { db, schemesTable } from "@workspace/db";
import { ListSchemesQueryParams, ListSchemesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Static fallback schemes — used when the DB has no seeded data.
const STATIC_SCHEMES = [
  {
    id: 2001,
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Direct income support of ₹6,000 per year to all land-holding farmer families across India, paid in three equal instalments of ₹2,000 every four months.",
    eligibility:
      "All land-holding farmers with cultivable land. Exclusions: income tax payers, institutional landholders, constitutional post holders.",
    benefit: "₹6,000/year direct bank transfer (₹2,000 × 3 instalments). Over 11 crore beneficiaries.",
    applicationUrl: "https://pmkisan.gov.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2002,
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Comprehensive crop insurance scheme providing financial support to farmers suffering crop loss or damage due to unforeseen events like natural calamities, pests, and diseases.",
    eligibility:
      "All farmers growing notified crops in notified areas. Compulsory for loanee farmers, voluntary for non-loanee farmers.",
    benefit:
      "Premium as low as 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. Full insurance cover for crop loss.",
    applicationUrl: "https://pmfby.gov.in",
    applicableCrops: ["Wheat", "Paddy", "Cotton", "Maize", "Soybean", "Groundnut"],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2003,
    name: "Kisan Credit Card (KCC)",
    ministry: "Ministry of Finance",
    description:
      "Provides farmers with affordable and timely credit for agricultural needs including seeds, fertilisers, pesticides, and post-harvest expenses.",
    eligibility:
      "All farmers, sharecroppers, oral lessees, and self-help groups of farmers. Allied activities (animal husbandry, fisheries) also covered.",
    benefit:
      "Credit up to ₹3 lakh at 7% interest rate (effective 4% with government interest subvention). No processing fee for loans up to ₹3 lakh.",
    applicationUrl: "https://agricoop.nic.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2004,
    name: "PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)",
    ministry: "Ministry of New and Renewable Energy",
    description:
      "Provides solar pumps and grid-connected solar power plants to farmers, reducing dependence on diesel and grid electricity, boosting farmer income through solar energy sales.",
    eligibility:
      "Individual farmers, groups of farmers, cooperatives, panchayats, farmer-producer organisations, and water-user associations.",
    benefit:
      "Central subsidy of 30% + state subsidy of 30% on solar pumps. Farmer pays only 40% (with loan option). Additional income from selling surplus power to grid.",
    applicationUrl: "https://mnre.gov.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2005,
    name: "Soil Health Card Scheme",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Issues soil health cards to farmers which carry crop-wise recommendations of nutrients and fertilisers to help improve productivity.",
    eligibility: "All farmers across India.",
    benefit:
      "Free soil testing every 2 years. Personalised crop-wise fertiliser recommendations to save input costs by 10-15%.",
    applicationUrl: "https://soilhealth.dac.gov.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2006,
    name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    ministry: "Ministry of Jal Shakti",
    description:
      "Aims to provide end-to-end solutions in irrigation supply chain — from source creation to field-level application — under the motto 'Har Khet Ko Pani, More Crop Per Drop'.",
    eligibility: "All farmers, with focus on small and marginal farmers for micro-irrigation subsidy.",
    benefit:
      "55% subsidy for small & marginal farmers, 45% for other farmers on micro-irrigation (drip/sprinkler) systems.",
    applicationUrl: "https://pmksy.gov.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2007,
    name: "National Agriculture Market (e-NAM)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Pan-India electronic trading portal connecting APMCs to create a unified national market for agricultural commodities. Farmers can sell produce through transparent online bidding.",
    eligibility:
      "Farmers registered on e-NAM portal. Currently operational in 1,000+ mandis across 18 states and 3 UTs.",
    benefit:
      "Access to more buyers beyond local mandi, transparent price discovery, direct payment to bank account, reduced commission charges.",
    applicationUrl: "https://enam.gov.in",
    applicableCrops: ["Wheat", "Paddy", "Maize", "Soybean", "Mustard", "Cotton", "Onion", "Tomato"],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2008,
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Promotes organic farming in clusters to reduce chemical input costs, improve soil health, and open premium markets for farmers producing certified organic produce.",
    eligibility:
      "Farmers willing to adopt organic farming practices and form clusters of 50 farmers covering 50 acres.",
    benefit:
      "Financial assistance of ₹50,000/hectare over 3 years. Certification support, branding, and marketing assistance included.",
    applicationUrl: "https://agricoop.nic.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2009,
    name: "Pradhan Mantri Annadata Aay Sanrakshan Abhiyan (PM-AASHA)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Comprehensive scheme to ensure farmers get remunerative prices for oilseeds, pulses, and copra through three sub-schemes: PDPS, PSS, and PPPS.",
    eligibility:
      "Farmers growing notified oilseeds and pulses in states that have opted for the scheme.",
    benefit:
      "Price Deficiency Payment (difference between MSP and modal price) directly credited to farmer's bank account when market prices fall below MSP.",
    applicationUrl: "https://agricoop.nic.in",
    applicableCrops: ["Soybean", "Mustard", "Groundnut", "Gram", "Lentil", "Sunflower"],
    applicableStates: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Gujarat", "Karnataka"],
    deadline: null,
  },
  {
    id: 2010,
    name: "Agriculture Infrastructure Fund (AIF)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Medium to long-term debt financing facility for post-harvest management infrastructure and community farming assets at farm level.",
    eligibility:
      "Farmers, FPOs, PACS, Agri-entrepreneurs, start-ups, and central/state government bodies.",
    benefit:
      "Interest subvention of 3% p.a. for loans up to ₹2 crore. Credit guarantee coverage under CGTMSE. Can build cold storage, warehouses, processing units.",
    applicationUrl: "https://agriinfra.dac.gov.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2011,
    name: "Micro Irrigation Fund (MIF)",
    ministry: "NABARD",
    description:
      "Dedicated fund with NABARD to facilitate states in mobilising resources for expanding coverage of micro-irrigation beyond PMKSY-PDMC targets.",
    eligibility: "State governments; benefits passed to individual farmers.",
    benefit:
      "Low-cost loans to states for additional subsidies on drip/sprinkler irrigation beyond central assistance. Reduces farmer's share to 10-15%.",
    applicationUrl: "https://nabard.org",
    applicableCrops: ["Cotton", "Sugarcane", "Tomato", "Onion", "Groundnut"],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2012,
    name: "National Mission for Sustainable Agriculture (NMSA)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Promotes sustainable agriculture practices through soil health management, water use efficiency, diversified farming systems, and climate change adaptation.",
    eligibility: "All farmers; focus on rain-fed and drought-prone areas.",
    benefit:
      "Subsidies on soil and water conservation works, organic input production units, and water harvesting structures. Up to ₹5,000/hectare assistance.",
    applicationUrl: "https://agricoop.nic.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2013,
    name: "Gramin Bhandaran Yojana (Rural Godown Scheme)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Creates scientific storage capacity in rural areas to reduce post-harvest losses and prevent distress sales during harvest season when prices are lowest.",
    eligibility: "Individuals, farmers, NGOs, SHGs, panchayats, and companies in rural areas.",
    benefit:
      "Capital subsidy of 25% (33.33% for SC/ST/NE) on project cost. Loan from NABARD at concessional rates. Reduces distress selling at harvest time.",
    applicationUrl: "https://nabard.org",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
  {
    id: 2014,
    name: "Rashtriya Krishi Vikas Yojana (RKVY)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Incentivises states to increase public investment in agriculture through need-based, result-oriented projects chosen by states.",
    eligibility: "State-driven; benefits flow to farmers through state-designed projects.",
    benefit:
      "Flexible funding for state agricultural plans. Includes RAFTAAR sub-scheme providing venture capital to agri start-ups via MANAGE.",
    applicationUrl: "https://rkvy.nic.in",
    applicableCrops: [],
    applicableStates: [],
    deadline: null,
  },
];

router.get("/schemes", async (req, res): Promise<void> => {
  const parsed = ListSchemesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const rows = await db.select().from(schemesTable).orderBy(schemesTable.name);

    const result = rows.map((r) => ({
      ...r,
      applicationUrl: r.applicationUrl ?? null,
      applicableCrops: r.applicableCrops ?? [],
      applicableStates: r.applicableStates ?? [],
      deadline: r.deadline ?? null,
    }));

    // Fall back to static data if DB has no schemes
    if (result.length === 0) {
      res.json(ListSchemesResponse.parse(STATIC_SCHEMES));
      return;
    }

    res.json(ListSchemesResponse.parse(result));
  } catch (err) {
    res.json(ListSchemesResponse.parse(STATIC_SCHEMES));
  }
});

export default router;
