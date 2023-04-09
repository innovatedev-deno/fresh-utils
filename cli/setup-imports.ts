import { getFreshUtilsImports } from "./core.ts";
import {freshImports, twindImports} from "./deps.ts";

export async function setupImports(configFile: string, freshUtilsUrl: string) {
  const freshUtilsImports = getFreshUtilsImports(configFile,freshUtilsUrl);
  const imports = (await freshUtilsImports).default.imports;

  freshImports(imports);
  twindImports(imports);

  imports["fresh-utils"] = `${freshUtilsUrl}mod.ts`;
  imports["fresh-utils/"] = freshUtilsUrl;

  try {
    Deno.statSync(configFile)
  } catch (error) {
    if(error instanceof Deno.errors.NotFound) {
      console.error(`Config file ${configFile} does not exist. Are you in a Deno Fresh project?

To create a new fresh project, run:

  deno run -A https:://fresh.deno.dev my-project
  cd my-project
  fresh-utils init
`);
      Deno.exit(1);
    }
    throw error;
  }
  
  const config = JSON.parse(Deno.readTextFileSync(configFile));
  const existingImports = config.imports;
  
  const newImports = Object.keys(imports).reduce((acc: Record<string, string>, key) => {
    if(!existingImports[key] || existingImports[key] !== imports[key]) {
      acc[key] = imports[key];
    }
    return acc;
  }
  , {});

  if(Object.keys(newImports).length === 0) {
    console.log(`No new imports to add to ${configFile}`);
  } else {
    const newConfig = {
      ...config,
      imports: {
        ...existingImports,
        ...newImports,
      }
    }

    Deno.writeTextFileSync(configFile, JSON.stringify(newConfig, null, 2));
  }
}