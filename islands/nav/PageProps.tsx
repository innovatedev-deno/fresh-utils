// Islands must be located in the project's islands directory.
// copy this code, or to use this directly, create ~/islands/PageProps.tsx add this code:
//
// export {default as default} from 'fresh-utils/islands/nav/PageProps.tsx';
//
import { PageProps } from '$fresh/server.ts'
import { useEffect } from "preact/hooks";
import {pageProps} from 'fresh-utils/signals/template.ts'

export default function PagePropsIsland({props}: {props: PageProps}) {
  // needs to be set in an island
  useEffect(() => {
    pageProps.value = props;
  }, []);

  // islands must return a node (fragment doesn't work)
  return <div></div>
}
