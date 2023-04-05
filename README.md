# fresh-utils

Just a place to dump common files used in [Fresh](https://fresh.deno.dev/docs) projects as well as a pattern to allow re-using components/routes/islands/middleware relying on a common pattern for import_map aliases.

## Requirements

Import Map (see [import_map.json](import_map.json)):

```jsonc
{
  "imports": {
    // other dependencies ...
    
    "~/": "./",
    "fresh-utils/": "https://raw.githubusercontent.com/innovatedev-deno/fresh-utils/0.0.1-dev-1/",
    "denomailer": "https://deno.land/x/denomailer@1.5.3/mod.ts",
    "dotenv/": "https://deno.land/x/dotenv@v3.2.0/",
    "validasaur": "https://deno.land/x/validasaur@v0.15.0/mod.ts"
  }
}
```

## Routes

Routes must be in your project directly. You can copy a route file from this repo, and it should work, provided you have the import_map.json setup the same. Alternatively, you can use them directly from this repo by creating the desired route file, and puting this into it:

```ts
export {default as default} from 'fresh-utils/routes/route-file-you-want.tsx';
```

If there is a handler, you must export that as well (or export your own handler):

```ts
export {handler, default as default} from 'fresh-utils/routes/contact.tsx';
```

If the route uses any islands, you must do a similar process for those.

If you get an error like the following, you are missing an island:

```
error: Uncaught (in promise) TypeError: Module not found "file:///var/www/my-app/islands/ContactForm.tsx".
```

See [Islands](#islands) for details on how to use islands from this repo.

## Middleware

Middleware files must be in your project directly. The best way to use middlewares is create the `~/routes/_middleware.ts` file in your project, then do the following:

```ts
export { handler } from "fresh-utils/lib/middleware/whatever-middleware-you-need.ts";
```

[Fresh supports multiple middlewares](https://fresh.deno.dev/docs/concepts/middleware) defined in a single `_middleware.ts` file. For example, to use the SEO middleware from this repo along with your own middleware, do the following:

```ts
import { handler as seoHandler } from "fresh-utils/lib/middleware/seo.ts";

export const handler = [
  seoHandler,
  async function myCustomMiddleware(req, ctx) {
    // do something
    return ctx.next();
  },
]
```

## Islands

Islands must be in your project directly. You cannot import from a remote location and have them work. The 2 options to use islands from this repo, copy the island you are interested in using, update any imports as necessary, or:

Create the file in your ~/islands folder, and use this code to use the version in this repo:

```ts
export {default as default} from 'fresh-utils/islands/path/to/IslandYouWant.tsx';
```

> Note: Islands cannot currently be in folders. The folder structure in this repo is purely for organization purposes, but cannot not be replicated for islands.

Some Islands have signals to access shared state. If you need to customize this, you will need to either make a scope in your `import_map.json` to [override the specific file](https://deno.land/manual@v1.17.2/npm_nodejs/import_maps#overriding-imports) the signals you need to change are located in, or make copies of all related components in your local folder and adjust their dependencies.
