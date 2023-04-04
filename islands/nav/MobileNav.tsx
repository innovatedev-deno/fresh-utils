// Islands must be located in the project's islands directory.
// copy this code, or to use this directly, create ~/islands/MobileNav.tsx add this code:
//
// export default from 'fresh-utils/islands/nav/MobileNav.tsx'
//
import { tw } from "twind";
import { useState, useId } from "preact/hooks";
import { pageProps } from "../../signals/pageProps.ts";

export default function({links}: {links: {href: string, text: string}[]}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  let resolvedPath = pageProps.value?.route;
  if(resolvedPath !== undefined) {
    Object.entries(pageProps.value?.params!).forEach(([k, v]) => {
      resolvedPath = resolvedPath!.replace(`:${k}`, v)
    });
  }

  return <>
    <button
      type="button"
      aria-expanded={isMenuOpen}
      aria-label="Open menu"
      aria-controls={menuId}
      className={tw`block sm:hidden p-4 self-center`}
      onClick={() => setIsMenuOpen(v => !v)}>
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={tw`h-6 w-6 fill-current`}>
          <title>Menu</title>
          {isMenuOpen ? (
            <path d="M14.75 5.25H5.25C4.56 5.25 4 5.81 4 6.5C4 7.19 4.56 7.75 5.25 7.75H14.75C15.44 7.75 16 7.19 16 6.5C16 5.81 15.44 5.25 14.75 5.25Z" />
          ) : (
            <>
              <path d="M17.25 3.25H2.75C2.06 3.25 1.5 3.81 1.5 4.5C1.5 5.19 2.06 5.75 2.75 5.75H17.25C17.94 5.75 18.5 5.19 18.5 4.5C18.5 3.81 17.94 3.25 17.25 3.25Z" />
              <path d="M17.25 8.75H2.75C2.06 8.75 1.5 9.31 1.5 10C1.5 10.69 2.06 11.25 2.75 11.25H17.25C17.94 11.25 18.5 10.69 18.5 10C18.5 9.31 17.94 8.75 17.25 8.75Z" />
              <path d="M17.25 14.25H2.75C2.06 14.25 1.5 14.81 1.5 15.5C1.5 16.19 2.06 16.75 2.75 16.75H17.25C17.94 16.75 18.5 16.19 18.5 15.5C18.5 14.81 17.94 14.25 17.25 14.25Z" />
            </>
          )}
        </svg>
      </button>
    <div class={tw`${
          isMenuOpen ? 'flex' : 'hidden'
        } sm:flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-4 w-full sm:w-auto sm:space-y-0 space-y-2 text-center`}
        id={menuId}>
      {links.map(link => <a
        class={`p-4 border-t sm:border-0 border-gray-400 block ${
          resolvedPath?.startsWith(link.href) ? 'font-bold underline' : ''
        }`}
        href={link.href}>
          {link.text} - {resolvedPath}
        </a>
      )}
    </div>
  </>
}
