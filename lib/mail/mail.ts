import { SMTPClient } from "denomailer";
import settings from "~/settings.ts";

export function getClient() {
  return new SMTPClient({
    connection: {
      hostname: settings.smtp.host,
      port: settings.smtp.port,
      tls: true,
      auth: {
        username: settings.smtp.username,
        password: settings.smtp.password,
      },
    },
  });
}

export async function send(
  {
    from,
    subject,
    content,
    html,
  }: {
    from: string;
    subject: string;
    content: string;
    html: string;
  },
  to = `"${settings.email.name}" <${settings.email.to}>`,
) {
  const client = getClient();
  await client.send({ to, from: to, replyTo: from, subject, content, html });
  await client.close();
}
