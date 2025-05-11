import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string{
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:`);
    console.log(chalk.white('--version:                   # выводит номер версии'));
    console.log(chalk.blue('--help:                      # печатает этот текст'));
    console.log(chalk.red('--import <path>:             # импортирует данные из TSV'));
    console.log(chalk.green('--generate <n> <path> <url>  # генерирует произвольное количество тестовых данных'));
  }
}
