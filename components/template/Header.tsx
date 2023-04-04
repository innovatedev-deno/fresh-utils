import { tw } from "twind";
import MobileNav from "~/islands/MobileNav.tsx";

export default function({title}: {title?: string}) {
  const styles = {
    logo: tw`font-bold text-xl p-4 whitespace-nowrap flex items-center`,
    logoImg: tw`inline-block mr-4 w-[48px]`,
  }
  return <>
    <a href="/" class={styles.logo}>
      <img src="/logo.svg" class={styles.logoImg} />
      {title}
    </a>
    
    <MobileNav links={[
      { href: "/blog", text: "Blog" },
      { href: "/contact", text: "Contact" },
      // TODO: share context with this component to handle auth nav
      { href: "/login", text: "Login" },
    ]} />
  </>
}
