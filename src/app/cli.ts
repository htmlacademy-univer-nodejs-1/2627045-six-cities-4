import { Command } from '../cli/commands/command.interface.js';

type ParsedCommand = {
    [key: string]: string[]
}

export default class CliApplication {
  private commands: { [propertyName: string]: Command } = {};
  private defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

  public registerCommands(commandList: Command[]): void {
    commandList.reduce((acc, command) => {
      const cliCommand = command;
      acc[cliCommand.getName()] = cliCommand;
      return acc;
    }, this.commands);
  }
}
