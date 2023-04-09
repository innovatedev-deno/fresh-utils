import { Commands, VERSION, getUrl } from "./utils/cli/core.ts";
import { parseWithHelp } from "./utils/cli/args-parse-with-help.ts";

import { installFreshUtils } from "./utils/cli/install-fresh-utils.ts";
import { setupImports } from "./utils/cli/setup-imports.ts";

const commands: Commands = {
  install: {
    command: (options: {version?: string, url?: string}) => {
      installFreshUtils(options.version, options.url);
    },
    description: "Install/upgrade fresh-utils",
    options: {
      string: ["version", "url",],
      default: {
        url: getUrl(undefined, undefined, 'main'),
      },
      description: {
        version: `Version of fresh-utils to use. (default: main)`,
        url: `URL to fresh-utils library. If --version is specified, this is ignored.\n\t\t\t`,
      }
    },
  },
  init: {
    command: (options: {config?: string, version?: string, url?: string}) => {
      if(options.config) {
        setupImports(options.config, getUrl(options.version, options.url));
      }
    },
    description: "Initialize a fresh project to use fresh-utils",
    options: {
      string: ["config", "version", "url",],
      negatable: ["config"],
      default: {
        config: "./import_map.json",
        url: getUrl(),
        "import-map": true,
      },
      description: {
        config: "Path to import_map.json or deno.json to add fresh-utils imports to",
        version: `Version of fresh-utils to use. (default: ${VERSION})`,
        url: `URL to fresh-utils library. If --version is specified, this is ignored.\n\t\t\t`,
      }
    },
  }
}


if (import.meta.main) {
  const main = 'fresh-utils.ts';
  const {command, _, ...options} = parseWithHelp(main, Deno.args, commands);
  
  command(options);
}
