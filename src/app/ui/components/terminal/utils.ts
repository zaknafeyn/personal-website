import {
  Command,
  echoCommands,
  UtilityCommand,
  utilityCommands,
  EchoCommand,
} from "../../commands/types";

export function isEchoCommand(arg: string): arg is EchoCommand {
  return (echoCommands as ReadonlyArray<string>).includes(arg);
}

export function isUtilityCommand(arg: string): arg is UtilityCommand {
  return (utilityCommands as ReadonlyArray<string>).includes(arg);
}

export function isValidCommand(arg: string): arg is Command {
  return isEchoCommand(arg) || isUtilityCommand(arg);
}
