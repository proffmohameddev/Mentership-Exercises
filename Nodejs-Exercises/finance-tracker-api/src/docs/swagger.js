import { CATEGORIES } from "../utils/constants.js";

const obj = (properties, required = []) => ({ type: "object", properties, required });
const jsonBody = (schema) => ({ required: true, content: { "application/json": { schema } } });
const secured = { security: [{ bearerAuth: [] }] };
const idParam = {
  name: "id", in: "path", required: true, schema: { type: "string" },
  description: "Transaction id",
};
const monthParam = {
  name: "month", in: "query", schema: { type: "string", example: "2025-05" },
  description: "Format YYYY-MM",
};
const res = (description) => ({ description });

const transactionFields = {
  title: { type: "string", example: "Groceries" },
  amount: { type: "number", example: -50 },
  type: { type: "string", enum: ["income", "expense"] },
  category: { type: "string", enum: CATEGORIES },
  date: { type: "string", format: "date", example: "2025-05-27" },
};

const servers = [{ url: "http://localhost:3000", description: "Local" }];
if (process.env.RENDER_URL) {
  servers.unshift({ url: process.env.RENDER_URL, description: "Render (live)" });
}

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Personal Finance Tracker API",
    version: "1.0.0",
    description: "Track income and expenses, see monthly summaries, and upload a profile picture.",
  },
  servers,
  tags: [{ name: "Auth" }, { name: "Transactions" }, { name: "Categories" }, { name: "Upload" }, { name: "Admin" }],
  components: {
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"], summary: "Create an account",
        requestBody: jsonBody(obj({
          name: { type: "string", example: "Abdi" },
          email: { type: "string", example: "abdi@example.com" },
          password: { type: "string", example: "secret123" },
        }, ["name", "email", "password"])),
        responses: { 201: res("Account created, token returned"), 400: res("Validation error or email taken") },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"], summary: "Log in",
        requestBody: jsonBody(obj({
          email: { type: "string", example: "abdi@example.com" },
          password: { type: "string", example: "secret123" },
        }, ["email", "password"])),
        responses: { 200: res("Token returned"), 401: res("Wrong email or password") },
      },
    },
    "/auth/profile": {
      get: {
        tags: ["Auth"], summary: "Get my profile", ...secured,
        responses: { 200: res("Current user"), 401: res("Not logged in") },
      },
    },
    "/transactions": {
      post: {
        tags: ["Transactions"], summary: "Add a transaction", ...secured,
        requestBody: jsonBody(obj(transactionFields, ["title", "amount", "type", "category"])),
        responses: { 201: res("Created"), 400: res("Validation error") },
      },
      get: {
        tags: ["Transactions"], summary: "List my transactions", ...secured,
        parameters: [
          { name: "type", in: "query", schema: { type: "string", enum: ["income", "expense"] } },
          { name: "category", in: "query", schema: { type: "string", enum: CATEGORIES } },
          monthParam,
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
        ],
        responses: { 200: res("Paginated list") },
      },
    },
    "/transactions/monthly-summary": {
      get: {
        tags: ["Transactions"], summary: "Totals per category for a month", ...secured,
        parameters: [monthParam],
        responses: { 200: res("Income, expense, balance and per-category totals") },
      },
    },
    "/transactions/{id}": {
      put: {
        tags: ["Transactions"], summary: "Edit a transaction", ...secured,
        parameters: [idParam],
        requestBody: jsonBody(obj(transactionFields)),
        responses: { 200: res("Updated"), 404: res("Not found") },
      },
      delete: {
        tags: ["Transactions"], summary: "Delete a transaction", ...secured,
        parameters: [idParam],
        responses: { 200: res("Deleted"), 404: res("Not found") },
      },
    },
    "/categories": {
      get: { tags: ["Categories"], summary: "List predefined categories", responses: { 200: res("Categories") } },
    },
    "/upload/profile-picture": {
      post: {
        tags: ["Upload"], summary: "Upload a profile picture (max 2MB)", ...secured,
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: obj({ image: { type: "string", format: "binary" } }, ["image"]),
            },
          },
        },
        responses: { 200: res("Cloudinary URL saved"), 400: res("No file or wrong type") },
      },
    },
    "/admin/overview": {
      get: {
        tags: ["Admin"], summary: "Site-wide stats (admin only)", ...secured,
        responses: { 200: res("Totals and top spending categories"), 403: res("Not an admin") },
      },
    },
  },
};
