import { Router, type IRouter } from "express";
import { and, eq, desc } from "drizzle-orm";
import { db, alertsTable, anomaliesTable } from "@workspace/db";
import { ListAlertsQueryParams, ListAlertsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Static fallback alerts — used when the DB has no seeded alerts data.
const STATIC_ALERTS = [
  {
    id: 1001,
    type: "exploitation" as const,
    crop: "Wheat",
    market: "Khanna Mandi",
    state: "Punjab",
    severity: "high" as const,
    title: "Price Suppression Detected at Khanna Mandi",
    description:
      "Multiple farmers reported being offered ₹1,850/quintal for wheat against the mandi modal price of ₹2,420. Arthiyas are citing artificial moisture-content issues to justify the lower price.",
    affectedFarmers: 450,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
  {
    id: 1002,
    type: "msp_violation" as const,
    crop: "Paddy",
    market: "Patna Market",
    state: "Bihar",
    severity: "critical" as const,
    title: "MSP Violation — Paddy Prices Below Support Price",
    description:
      "Paddy prices at Patna Market have dropped to ₹1,980/quintal, below the MSP of ₹2,300. Immediate government procurement is needed to protect farmers.",
    affectedFarmers: 1200,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
  {
    id: 1003,
    type: "anomaly" as const,
    crop: "Onion",
    market: "Azadpur Mandi",
    state: "Delhi",
    severity: "medium" as const,
    title: "Unusual Price Drop in Onion Arrivals",
    description:
      "Onion prices have dropped 35% over 3 days despite no change in arrivals volume. Market intelligence suggests coordinated buying suppression by a group of commission agents.",
    affectedFarmers: 320,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
  {
    id: 1004,
    type: "market_crash" as const,
    crop: "Tomato",
    market: "Kolar Market",
    state: "Karnataka",
    severity: "critical" as const,
    title: "Tomato Price Crash — Farmers Forced to Dump Produce",
    description:
      "Tomato prices at Kolar have crashed to ₹2/kg, far below the cost of production (≈₹12/kg). Several farmers have abandoned produce on the road rather than incur transport losses.",
    affectedFarmers: 2800,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
  {
    id: 1005,
    type: "msp_violation" as const,
    crop: "Cotton",
    market: "Yavatmal APMC",
    state: "Maharashtra",
    severity: "high" as const,
    title: "Cotton MSP Violation at Yavatmal APMC",
    description:
      "Private traders at Yavatmal APMC are buying cotton at ₹6,400/quintal, ₹721 below the declared MSP of ₹7,121. Farmers unaware of their legal entitlements are accepting these prices.",
    affectedFarmers: 680,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
  {
    id: 1006,
    type: "exploitation" as const,
    crop: "Soybean",
    market: "Indore Krishi Upaj Mandi",
    state: "Madhya Pradesh",
    severity: "high" as const,
    title: "Soybean Weighing Irregularities at Indore Mandi",
    description:
      "Farmer groups have filed complaints about systematic short-weighing at three commission agent shops. An estimated 3-5% short-weight per bag is costing farmers around ₹150-200 per quintal.",
    affectedFarmers: 530,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
  {
    id: 1007,
    type: "anomaly" as const,
    crop: "Mustard",
    market: "Bharatpur Mandi",
    state: "Rajasthan",
    severity: "medium" as const,
    title: "Mustard Prices Diverge Sharply from National Average",
    description:
      "Mustard prices at Bharatpur Mandi are trading 18% below the national average despite comparable quality. The anomaly suggests potential market manipulation or logistical barriers preventing arbitrage.",
    affectedFarmers: 290,
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
  {
    id: 1008,
    type: "market_crash" as const,
    crop: "Maize",
    market: "Davangere Market",
    state: "Karnataka",
    severity: "high" as const,
    title: "Maize Prices Collapse Due to Cold Storage Shortage",
    description:
      "A surge in maize arrivals combined with a shortage of cold-storage capacity has caused prices to fall 28% in 10 days. Farmers are being forced to sell at distress prices.",
    affectedFarmers: 1100,
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
  {
    id: 1009,
    type: "msp_violation" as const,
    crop: "Gram",
    market: "Latur Mandi",
    state: "Maharashtra",
    severity: "medium" as const,
    title: "Gram (Chana) Traded Below MSP at Latur",
    description:
      "Gram is being traded at ₹5,200/quintal at Latur Mandi, below the MSP of ₹5,650. State procurement centres are not operational, leaving farmers with no alternative buyer.",
    affectedFarmers: 410,
    createdAt: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
    isResolved: true,
  },
  {
    id: 1010,
    type: "exploitation" as const,
    crop: "Sugarcane",
    market: "Muzaffarnagar",
    state: "Uttar Pradesh",
    severity: "critical" as const,
    title: "Sugarcane Mills Delaying SAP Payments Beyond Legal Limit",
    description:
      "Three sugar mills in Muzaffarnagar district have not paid the State Advised Price (SAP) for over 90 days, violating UP Sugarcane (Regulation of Supply and Purchase) Act. Total dues exceed ₹120 crore.",
    affectedFarmers: 8500,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    isResolved: false,
  },
];

router.get("/alerts", async (req, res): Promise<void> => {
  const parsed = ListAlertsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { state, severity } = parsed.data;

  try {
    // 1. Fetch from alerts table
    const conditions = [];
    if (state) conditions.push(eq(alertsTable.state, state));
    if (severity) conditions.push(eq(alertsTable.severity, severity));

    const alertRows = await db
      .select()
      .from(alertsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(alertsTable.createdAt))
      .limit(80);

    // 2. Fetch anomalies and convert to alert shape
    const anomalyConditions = [];
    if (state) anomalyConditions.push(eq(anomaliesTable.state, state));
    if (severity) anomalyConditions.push(eq(anomaliesTable.severity, severity));

    const anomalyRows = await db
      .select()
      .from(anomaliesTable)
      .where(anomalyConditions.length > 0 ? and(...anomalyConditions) : undefined)
      .orderBy(desc(anomaliesTable.detectedAt))
      .limit(20);

    const alertsFromDb = alertRows.map((r) => ({
      id: r.id,
      type: r.type as "exploitation" | "anomaly" | "msp_violation" | "market_crash",
      crop: r.crop,
      market: r.market,
      state: r.state,
      severity: r.severity as "low" | "medium" | "high" | "critical",
      title: r.title,
      description: r.description,
      affectedFarmers: r.affectedFarmers ?? null,
      createdAt: r.createdAt.toISOString(),
      isResolved: r.isResolved,
    }));

    const alertsFromAnomalies = anomalyRows.map((a) => ({
      id: 90000 + a.id,
      type: "anomaly" as const,
      crop: a.crop,
      market: a.market,
      state: a.state,
      severity: a.severity as "low" | "medium" | "high" | "critical",
      title: `Price Anomaly Detected — ${a.crop} at ${a.market}`,
      description: `Reported price ₹${Number(a.reportedPrice).toFixed(0)}/quintal deviates ${Number(a.deviationPct).toFixed(1)}% from expected ₹${Number(a.expectedPrice).toFixed(0)}/quintal. Anomaly score: ${Number(a.anomalyScore).toFixed(2)}.`,
      affectedFarmers: null,
      createdAt: a.detectedAt.toISOString(),
      isResolved: false,
    }));

    // 3. Merge, sort by date, deduplicate by id
    let combined = [...alertsFromDb, ...alertsFromAnomalies].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    // 4. Fall back to static data if DB returned nothing
    if (combined.length === 0) {
      let fallback = STATIC_ALERTS;
      if (severity) fallback = fallback.filter((a) => a.severity === severity);
      if (state) fallback = fallback.filter((a) => a.state === state);
      combined = fallback;
    }

    res.json(ListAlertsResponse.parse(combined));
  } catch (err) {
    // If DB is unavailable, serve static data
    let fallback = STATIC_ALERTS;
    if (severity) fallback = fallback.filter((a) => a.severity === severity);
    if (state) fallback = fallback.filter((a) => a.state === state);
    res.json(ListAlertsResponse.parse(fallback));
  }
});

export default router;
