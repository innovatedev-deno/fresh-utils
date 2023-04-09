import { relative, join } from "https://deno.land/std@0.182.0/path/mod.ts";
import { ParseOptions } from "./deps.ts";

export const VERSION = "0.0.1-dev-4";

export interface Command {
  command: (options: Record<string, boolean|string|number>) => void;
  description: string;
  options: ParseOptions & {description: {[key: string]: string}};
}
export interface Commands {
  [key: string]: Command
}

export function getUrl(version?: string, url?: string, fallbackVersion=VERSION): string {
  const defaultUrl = "https://raw.githubusercontent.com/innovatedev-deno/fresh-utils/";
  return version ? `${url??defaultUrl}${version}/` : url??`${defaultUrl}${fallbackVersion}/`
}

export function getFreshUtilsImports(config: string, url: string) {
  if(url.startsWith(".")) {
    url = join(Deno.cwd(),relative(Deno.cwd(), url));
  }
  return import(join(url, config), {
    assert: {
      type: "json"
    }
  });
  
}