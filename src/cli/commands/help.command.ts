import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public readonly name: string = '--help';

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:`);
    chalk.white('--version:                   # выводит номер версии');
    chalk.blue('--help:                      # печатает этот текст');
    chalk.red('--import <path>:             # импортирует данные из TSV');
    chalk.green('--generate <n> <path> <url>  # генерирует произвольное количество тестовых данных');
  }
}
