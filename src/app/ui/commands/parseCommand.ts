// expect command in format of standard nix command like: <command> [(<arg> <value>) | (<arg>)]
export type ParsedArg = Record<string, string | boolean | string[]>;

export interface ParsedCommand {
  command: string;
  args?: ParsedArg[];
}

export function parseCommand(input: string): ParsedCommand {
  const tokens = tokenize(input);
  if (tokens.length === 0) {
    throw new Error("Empty command");
  }

  const command = tokens[0];
  const args: ParsedArg[] = [];

  const argMap: Record<string, string[] | true | string> = {};

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.startsWith("-")) {
      // const isLongFlag = token.startsWith("--");
      const flag = token.replace(/^-+/, "");

      const next = tokens[i + 1];
      const isValue = next && !next.startsWith("-");

      if (isValue) {
        if (argMap[flag] === true) {
          // Replace true with array if value comes later
          argMap[flag] = [next];
        } else if (Array.isArray(argMap[flag])) {
          (argMap[flag] as string[]).push(next);
        } else if (typeof argMap[flag] === "string") {
          argMap[flag] = [argMap[flag] as string, next];
        } else {
          argMap[flag] = next;
        }
        i++; // skip next token
      } else {
        if (!(flag in argMap)) {
          argMap[flag] = true;
        }
      }
    }
  }

  for (const [key, value] of Object.entries(argMap)) {
    args.push({ [key]: value });
  }

  return { command, args };
}

// Tokenizer with quoted strings handling
function tokenize(input: string): string[] {
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  const tokens: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[0]);
  }

  return tokens;
}
