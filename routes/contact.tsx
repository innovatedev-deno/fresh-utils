import { PageProps } from "$fresh/server.ts";
import { createContactHandler, Data } from "fresh-utils/lib/mail/contact.ts";
import { send } from "fresh-utils/lib/mail/mail.ts";

import ContactForm from "~/islands/ContactForm.tsx";
import Template from "~/components/Template.tsx";

import publicSettings from '~/settings-public.ts';

export const handler = createContactHandler((data) =>
  send({
    from: `${data.name} <${data.email}>`,
    subject: `${
      data.type == "contact"
        ? `${publicSettings.app.title} Submission`
        : `${publicSettings.app.title} Schedule Request`
    }`,
    content: `Name: ${data.name}
Email: ${data.email}
Message:
${data.message}`,
    html:
      `<div>Name: ${data.name} &lt;${data.email}&gt;</div>Message: <blockquote style="white-space: pre-wrap; border-left: solid 4px #dddddd;margin: 1em 0; padding: 1em;">${data.message}</blockquote></div>`,
  })
);

export default function ({ data }: PageProps<Data>) {
  return (
    <Template title="Contact">
      <div class="max-w-md m-auto">
        <div class="">
          <h2 class="text-xl font-bold my-4">Contact</h2>

          <ContactForm type="contact" {...data} />
        </div>
      </div>
    </Template>
  );
}
