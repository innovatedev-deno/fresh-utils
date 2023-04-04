import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import { tw, theme } from "twind";
import SkipToContent from "./SkipToContent.tsx";
import publicSettings from "~/settings-public.ts";
import Header from "~/components/template/Header.tsx";

interface TemplateProps {
  children: ComponentChildren;
  title?: string;
  footer?: ComponentChildren;
}

export default function MainTemplate({ children, title, footer=<p>
  &copy;{new Date().getFullYear()}
</p> }: TemplateProps) {

  // TODO: figure out why theme vars have spaces in them?
  const headerColor = tw(theme('colors.primary.dark')).trim();
  const footerColor = tw(theme('colors.secondary.dark')).trim();

  const contentBox = "max-w-screen-lg m-auto w-full";
  const styles = {
    container: tw`min-h-screen flex flex-col`,
    header: tw`bg-[${headerColor}]  text-white`,
    nav: tw`flex flex-wrap justify-between ${contentBox}`,
    main: tw`flex-grow p-4 ${contentBox}`,
    footer: tw`bg-[${footerColor}] text-white p-4`,
    footerText: tw`text-center ${contentBox}`,
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ""}{publicSettings.app.title}</title>

        <script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${publicSettings.recaptcha.siteId}`}
          defer
        >
        </script>
      </Head>

      <SkipToContent target="main-content" />

      <div class={styles.container}>
        <header class={styles.header}>
          <nav class={styles.nav} aria-label="Main">
            <Header title={publicSettings.app.title} />
          </nav>
        </header>
        
        <main class={styles.main} id="main-content">
          {children}
        </main>
        <footer class={styles.footer}>
          <div class={styles.footerText}>
            {footer}
          </div>
        </footer>
      </div>
    </>
  );
};
