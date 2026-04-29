import {
  allCommands,
  allCommandTokens,
  resolveCommandName,
} from "../../commands/registry";
import type { Command } from "../../commands/registry";

export function isValidCommand(arg: string): arg is Command {
  return resolveCommandName(arg) !== undefined;
}

function getEditDistance(source: string, target: string): number {
  const distances = Array.from(
    { length: source.length + 1 },
    (_, sourceIndex) => Array.from(
      { length: target.length + 1 },
      (_, targetIndex) => sourceIndex === 0 ? targetIndex : targetIndex === 0 ? sourceIndex : 0,
    ),
  );

  for (let sourceIndex = 1; sourceIndex <= source.length; sourceIndex++) {
    for (let targetIndex = 1; targetIndex <= target.length; targetIndex++) {
      const substitutionCost = source[sourceIndex - 1] === target[targetIndex - 1] ? 0 : 1;

      distances[sourceIndex][targetIndex] = Math.min(
        distances[sourceIndex - 1][targetIndex] + 1,
        distances[sourceIndex][targetIndex - 1] + 1,
        distances[sourceIndex - 1][targetIndex - 1] + substitutionCost,
      );
    }
  }

  return distances[source.length][target.length];
}

function isCloseCommandMatch(input: string, command: Command, distance: number): boolean {
  if (input.length < 2) {
    return false;
  }

  const longestLength = Math.max(input.length, command.length);
  const maxAllowedDistance = Math.max(1, Math.ceil(longestLength / 3));

  return distance <= maxAllowedDistance;
}

export function getClosestCommand(input: string): Command | undefined {
  const closestMatch = allCommandTokens.reduce<{ command: Command; distance: number }>((closest, currentCommand) => {
    const currentDistance = getEditDistance(input, currentCommand);
    const resolvedCommand = resolveCommandName(currentCommand) ?? allCommands[0];

    return currentDistance < closest.distance
      ? { command: resolvedCommand, distance: currentDistance }
      : closest;
  }, {
    command: allCommands[0],
    distance: getEditDistance(input, allCommands[0]),
  });

  return isCloseCommandMatch(input, closestMatch.command, closestMatch.distance)
    ? closestMatch.command
    : undefined;
}
