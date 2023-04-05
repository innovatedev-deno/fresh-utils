import ReCaptchaForm from "fresh-utils/components/forms/ReCaptchaForm.tsx";
import publicSettings from "~/settings-public.ts";

export default function (
  { type = "contact", errors, isSuccess, data }: {
    errors?: Record<string, Record<string, string>>;
    isSuccess?: boolean;
    type?: "schedule" | "contact";
    data?: { name: string; email: string; message: string };
  },
) {
  const recaptchaKey = publicSettings.recaptcha.siteId;
  const action = type == "schedule"
    ? "schedule_appointment_submission"
    : "contact_form_submission";

  return <ReCaptchaForm
    class="w-full"
    method="post"
    recaptchaKey={recaptchaKey}
    action={action}
  >
    {isSuccess
      ? (
        <div className="bg-green-200 border border-green-600 p-4 my-4">
          Thank you for your submission. We will be in touch with you
          shortly.
        </div>
      )
      : errors &&
        (
          <div class="bg-red-200 border border-red-600 p-4 my-4">
            {Object.entries(errors).map(([field, error]) =>
              Object.entries(error).map(([rule, message]) => (
                <div>{message}</div>
              ))
            )}
          </div>
        )}

    <input type="hidden" name="type" value={type} />

    <label>
      Name
      <input
        name="name"
        type="text"
        required
        value={data?.name}
      />
    </label>

    <label>
      Email
      <input
        type="email"
        name="email"
        value={data?.email}
      />
    </label>

    <label for="message" class="">
      Message
      <textarea
        name="message"
        rows={5}
        required
      >
        {data?.message}
      </textarea>
    </label>

    <div class="flex">
      <button type="submit">
        Send
      </button>
    </div>
  </ReCaptchaForm>
}
