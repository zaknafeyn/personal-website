// expect command in format of standard nix command like: <command> [(<arg> <value>) | (<arg>)]
export type ParsedArg = Record<string, string | boolean | string[]>;

export type ParsedRedirect = {
  type: "file";
  target: string;
};

export interface ParsedCommand {
  command: string;
  args?: ParsedArg[];
  params?: string[];
  redirect?: ParsedRedirect;
}

export function parseCommand(input: string): ParsedCommand {
  const tokens = tokenize(input);
  if (tokens.length === 0) {
    throw new Error("Empty command");
  }

  const command = tokens[0].toLowerCase();
  const args: ParsedArg[] = [];
  const params: string[] = [];
  let redirect: ParsedRedirect | undefined;

  const argMap: Record<string, string[] | true | string> = {};

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === ">") {
      redirect = {
        type: "file",
        target: tokens[i + 1] ?? "",
      };

      if (tokens[i + 1]) {
        i++;
      }

      continue;
    }

    if (token.startsWith("-")) {
      // const isLongFlag = token.startsWith("--");
      const flag = token.replace(/^-+/, "").toLowerCase();

      const next = tokens[i + 1];
      const isValue = next && !next.startsWith("-") && next !== ">";

      if (isValue) {
        if (argMap[flag] === true) {
          // Replace true with array if value comes later
          argMap[flag] = [next.toLowerCase()];
        } else if (Array.isArray(argMap[flag])) {
          (argMap[flag] as string[]).push(next.toLowerCase());
        } else if (typeof argMap[flag] === "string") {
          argMap[flag] = [argMap[flag] as string, next.toLowerCase()];
        } else {
          argMap[flag] = next.toLowerCase();
        }
        i++; // skip next token
      } else {
        if (!(flag in argMap)) {
          argMap[flag] = true;
        }
      }
    } else {
      params.push(token.toLowerCase());
    }
  }

  for (const [key, value] of Object.entries(argMap)) {
    args.push({ [key]: value });
  }

  return { command, args, params, redirect };
}

// Tokenizer with quoted strings handling
function tokenize(input: string): string[] {
  const regex = />|[^\s"'>]+|"([^"]*)"|'([^']*)'/g;
  const tokens: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[0]);
  }

  return tokens;
}
