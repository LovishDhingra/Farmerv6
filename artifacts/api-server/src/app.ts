import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { clerkMiddleware } from "@clerk/express";
import { publishableKeyFromHost } from "@clerk/shared/keys";
import {
  CLERK_PROXY_PATH,
  clerkProxyMiddleware,
  getClerkProxyHost,
} from "./middlewares/clerkProxyMiddleware";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import router from "./routes";
import { logger } from "./lib/logger";

const hasClerkKey = !!process.env.CLERK_SECRET_KEY;

const app: Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, "../../farmer-market/dist/public");

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

if (hasClerkKey) {
  app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());
}

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (hasClerkKey) {
  app.use(
    clerkMiddleware((req) => ({
      publishableKey: publishableKeyFromHost(
        getClerkProxyHost(req) ?? "",
        process.env.CLERK_PUBLISHABLE_KEY,
      ),
    })),
  );
} else {
  // Mock auth middleware — mirrors the frontend's clerk-mock when no Clerk keys are set.
  // Injects a minimal auth object so routes that call getAuth(req) get a stable mock user.
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    // @clerk/express reads auth state from a symbol on the request; we attach a plain
    // object that satisfies the shape getAuth() returns for an unauthenticated session.
    (_req as Record<string, unknown>)["__clerk_auth"] = {
      userId: "mock-user-id",
      sessionId: "mock-session-id",
      orgId: null,
    };
    next();
  });
}

app.use("/api", router);

// Serve static assets and handle SPA client-side routing
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
  app.get(/.*/, (req, res) => {
    const indexPath = path.resolve(publicPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("API Server is running. Static frontend build not found.");
    }
  });
} else {
  app.get("/", (req, res) => {
    res.send("API Server is running.");
  });
  app.get("/healthz", (req, res) => {
    res.send("OK");
  });
}

export default app;
