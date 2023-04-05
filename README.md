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

## Islands

Islands must be in your project directly. You cannot import from a remote location and have them work. The 2 options to use islands from this repo, copy the island you are interested in using, update any imports as necessary, or:

Create the file in your ~/islands folder, and use this code to use the version in this repo:

    export {default as default} from 'fresh-utils/islands/path/to/IslandYouWant.tsx';
  
Some Islands have signals to access shared state. If you need to customize this, you will need to either make a scope to override the specific file the signals you need to change are located in, or make copies of all related components in your local folder and adjust their dependencies.
