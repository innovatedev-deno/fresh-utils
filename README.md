# fresh-utils

## Requirements

Import Map:

    {
      "imports": {
        "~/": "./",
        "fresh-utils/": "https://raw.githubusercontent.com/innovatedev-deno/fresh-utils/main/",
        ...
      }
    }

## Islands

Islands must be in your project directly. You cannot import from a remote location and have them work. The 2 options to use islands from this repo, copy the island you are interested in using, update any imports as necessary, or:

Create the file in your ~/islands folder, and use this code to use the version in this repo:

    export {default as default} from 'fresh-utils/islands/path/to/IslandYouWant.tsx';
  
Some Islands have signals to access shared state. If you need to customize this, you will need to either make a scope to override the specific file the signals you need to change are located in, or make copies of all related components in your local folder and adjust their dependencies.
