import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const dbUrl = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    "No database URL found. Set POSTGRES_URL (or DATABASE_URL) in your environment."
  );
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
