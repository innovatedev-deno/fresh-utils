import { Command, Commands } from "./core.ts";
import { parse } from "./deps.ts";

export function getHelp(main: string, command: string, {description, options}: {description: string, options: Command['options']}) {
  const keys = ['string', 'boolean', "number"] as const;

  const help = `Usage: deno run ${main} ${command} [options]

${description}

Options:
  ${(keys).map((t: typeof keys[number]) => {
    const opts = (options as unknown as Record<typeof keys[number], string[]>)[t];
    return opts?.map((option) => `${`--${option} ${['string', 'number', 'collect'].includes(t) ? `<value> `:''}`.padEnd(14, ' ')}\t${options.description[option] ? `${options.description[option]} ` : ''}${options.default && options.default[option]?`(default: ${options.default[option]})`:t==='boolean' ? `\t\t(default: false)`:''}${options.negatable && options.negatable.includes(option)?`\n  --no-${option.padEnd(9, ' ')}\tSkip config`:''}`).join("\n  ").trim()
  }).join("\n  ").trim()}
  --help\t\tShow this help message and exit
`;

  return help;
}

export function parseWithHelp(main: string, args: string[], commands: Commands) {
  const command = args[0];

  if(!command || command == '--help') {
    console.log(`Usage: deno run ${main} <command> [options]

Commands:
  ${Object.keys(commands).map((command) => `${command.padEnd(10, ' ')}${commands[command].description}`).join("\n  ")}

deno run ${main} <command> --help \t Command help
`);
    Deno.exit(0);
  }

  const {description, options} = commands[command];

  const help = getHelp(main, command, {description, options});
  
  if(!options.boolean) {
    options.boolean = [];
  }
  if(typeof options.boolean === "string" ) {
    options.boolean = [options.boolean];
  }

  (options.boolean as string[]).push("help");
  
  const {"--": _bools, ...flags} = parse(Deno.args, options);

  if(flags.help) {
    console.log(help);
    Deno.exit(0);
  }

  return {command: commands[command].command, ...flags}
}