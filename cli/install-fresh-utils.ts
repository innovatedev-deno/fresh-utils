import { VERSION, getUrl } from "./core.ts";

export function installFreshUtils(version?: string, url?: string, fallbackVersion=VERSION) {
  new Promise<void>((resolve, reject) => {
    Deno.run({
      cmd: [
        "deno",
        "install",
        "--allow-run=deno",
        "--allow-net=raw.githubusercontent.com,deno.land",
        "--allow-read=./",
        "--allow-write=./",
        "-n=fresh-utils",
        "-f",
        `${getUrl(version, url, fallbackVersion)}cli/mod.ts`
      ],
      stdout: "inherit",
      stderr: "inherit",
    }).status().then((status) => {
      if(!status.success) {
        reject();
      } else {
        resolve();
      }
    });
  });
}