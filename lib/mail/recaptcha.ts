import publicSettings from "~/settings-public.ts";
import settings from "~/settings.ts";

export type GReCaptcha = {
  enterprise: {
    ready: (cb: () => void) => void;
    execute: (key: string, options: { action: string }) => Promise<string>;
  };
};
export default async function validate(token: string, action: string) {
  const projectId = settings.recaptcha.projectId;
  const apiKey = settings.recaptcha.apiKey;
  const siteKey = publicSettings.recaptcha.siteId;

  const url =
    `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;

  const body = {
    "event": {
      "token": token,
      "siteKey": siteKey,
      "expectedAction": action,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}
