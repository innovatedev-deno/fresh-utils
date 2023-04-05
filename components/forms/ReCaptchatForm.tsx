import { useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact";
import { GReCaptcha } from "fresh-utils/lib/recaptcha.ts";

export default function (
  { recaptchaKey, action, children, ...props }:
    & JSX.HTMLAttributes<HTMLFormElement>
    & { recaptchaKey: string; action: string },
) {
  const [token, setToken] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (token && formRef.current) {
      formRef.current.submit();
      setToken(undefined);
    }
  }, [token]);

  return (
    <form
      ref={formRef}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();

        const { grecaptcha } = globalThis as unknown as {
          grecaptcha: GReCaptcha;
        };

        grecaptcha.enterprise.ready(function () {
          grecaptcha.enterprise.execute(recaptchaKey, { action }).then(
            function (token: string) {
              setToken(token);
            },
          );
        });
      }}
    >
      {token &&
        (
          <>
            <input type="hidden" name="recaptchaToken" value={token} />
            <input type="hidden" name="recaptchaAction" value={action} />
          </>
        )}
      {children}
    </form>
  );
}
