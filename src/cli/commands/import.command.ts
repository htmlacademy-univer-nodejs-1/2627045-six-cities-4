import chalk from 'chalk';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { createOffer } from '../../shared/helpers/offer.js';
import TSVFileReader from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported`);
  }

  public async execute(filename: string): Promise<void> {
    if (filename === undefined) {
      console.log(chalk.red('Укажите после команды --import путь к файлу'));
    }
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);
    try {
      await fileReader.read();
    } catch (err) {
      console.error(chalk.red(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }
}
