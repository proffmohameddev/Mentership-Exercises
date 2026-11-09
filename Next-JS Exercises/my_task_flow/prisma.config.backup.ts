// prisma.config.ts
import "dotenv/config"; // 👈 VERY IMPORTANT: load .env before env()
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("MONGODB_URI"), // 👈 now reads from .env
  },
});
