import "dotenv/load.ts";

export default {
  smtp: {
    host: Deno.env.get("SMTP_HOST") || "",
    port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
    username: Deno.env.get("SMTP_USERNAME") || "",
    password: Deno.env.get("SMTP_PASSWORD") || "",
  },
  email: {
    to: Deno.env.get("EMAIL_TO_ADDRESS") || "",
    name: Deno.env.get("EMAIL_TO_NAME") || "",
  },
  recaptcha: {
    apiKey: Deno.env.get("RECAPTCHA_API_KEY") || "",
    projectId: Deno.env.get("RECAPTCHA_PROJECT_ID") || "",
  },
};
