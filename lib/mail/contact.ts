import { Handlers } from "$fresh/server.ts";
import { isEmail, maxLength, required, validate } from "validasaur";
import recaptcha from "~/lib/recaptcha.ts";

export type Data = {
  data: {
    recaptchaAction: string;
    recaptchaToken: string;
    type: "schedule" | "contact" | unknown;
    name: string;
    email: string;
    message: string;
  };
  isSuccess?: boolean;
  errors?: Record<string, Record<string, string>>;
};

export const createContactHandler = (
  callback: (data: Data["data"]) => unknown,
) => ({
  async POST(req, ctx) {
    const formData = await req.formData();

    const data: Data["data"] = {
      recaptchaAction: formData.get("recaptchaAction")?.toString() || "",
      recaptchaToken: formData.get("recaptchaToken")?.toString() || "",
      type: formData.get("type")?.toString() || "",
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    const [passes, validationErrors] = await validate(data, {
      recaptchaAction: [required],
      recaptchaToken: [required],
      type: [required, maxLength(100)],
      name: [required, maxLength(100)],
      email: [required, isEmail, maxLength(128)],
      message: [required, maxLength(500)],
    });

    if (!passes) {
      return ctx.render({ data, errors: validationErrors });
    }

    const recaptchaValidation = await recaptcha(
      data.recaptchaToken,
      data.recaptchaAction,
    );

    if (
      !recaptchaValidation ||
      !recaptchaValidation.tokenProperties ||
      !recaptchaValidation.tokenProperties.valid ||
      recaptchaValidation.tokenProperties.action !==
        recaptchaValidation.event.expectedAction
    ) {
      return ctx.render({
        data,
        errors: {
          recaptcha: {
            failed: "Error submitting form. Try again later.",
            detail: recaptchaValidation?.error,
          },
        },
      });
    }

    callback(data);

    return ctx.render({ isSuccess: true });
  },
} as Handlers);
