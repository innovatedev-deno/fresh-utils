import {freshImports, twindImports} from "./deps.ts";
import {freshUtilsImports} from "./deps.ts";

export function setupImports(configFile: string, freshUtilsUrl: string) {
  const imports: Record<string, string> = freshUtilsImports.imports;
  freshImports(imports);
  twindImports(imports);

  imports["fresh-utils"] = freshUtilsUrl;

  const config = JSON.parse(Deno.readTextFileSync(configFile));
  const existingImports = config.imports;
  
  const newImports = Object.keys(imports).reduce((acc: Record<string, string>, key) => {
    if(!existingImports[key] || existingImports[key] !== imports[key]) {
      acc[key] = imports[key];
    }
    return acc;
  }
  , {});

  const newConfig = {
    ...config,
    imports: {
      ...existingImports,
      ...newImports,
    }
  }

  
  if(Object.keys(newImports).length === 0) {
    console.log(`No new imports to add to ${configFile}`);
  } else {
    console.log(`Adding imports to ${configFile}:`, newImports);
    Deno.writeTextFileSync(configFile, JSON.stringify(newConfig, null, 2));
  }
}