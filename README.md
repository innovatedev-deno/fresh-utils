# fresh-utils

## Requirements

Import Map (see [import_map.json](import_map.json)):

    {
      "imports": {
        "~/": "./",
        "fresh-utils/": "https://raw.githubusercontent.com/innovatedev-deno/fresh-utils/main/",
        
        ...
        
        "denomailer": "https://deno.land/x/denomailer@1.5.3/mod.ts",
        "dotenv/": "https://deno.land/x/dotenv@v3.2.0/",
        "validasaur": "https://deno.land/x/validasaur@v0.15.0/mod.ts"
      }
    }

## Routes

Routes must be in your project directly. You can copy a route file from this repo, and it should work, provided you have the import_map.json setup the same, or:

    export {default as default} from 'fresh-utils/routes/route-file-you-want.tsx';
    
If there is a handler, you must export that as well:

    export {handler, default as default} from 'fresh-utils/routes/contact.tsx';

If the route uses any islands, you must do a similar process for those.

If you get an error like the following, you are missing an island:

    error: Uncaught (in promise) TypeError: Module not found "file:///var/www/my-app/islands/ContactForm.tsx".

See [Islands](#islands) for details on how to use islands from this repo.

## Islands

Islands must be in your project directly. You cannot import from a remote location and have them work. The 2 options to use islands from this repo, copy the island you are interested in using, update any imports as necessary, or:

Create the file in your ~/islands folder, and use this code to use the version in this repo:

    export {default as default} from 'fresh-utils/islands/path/to/IslandYouWant.tsx';

> Note: Islands cannot currently be in folders. The folder structure in this repo is purely for organization purposes, but cannot not be replicated for islands.

Some Islands have signals to access shared state. If you need to customize this, you will need to either make a scope to override the specific file the signals you need to change are located in, or make copies of all related components in your local folder and adjust their dependencies.
