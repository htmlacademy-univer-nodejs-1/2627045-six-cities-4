import {TsvFileReader} from '../../file-reader/tsv-file-reader.js';
import {Command} from './command.interface.js';

export class ImportCommand implements Command {
  public readonly name = '--import';

  public getName(): string{
    return this.name;
  }

  public execute(filename: string): void {
    const fileReader = new TsvFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      console.log(`Не удалось импортировать данные из файла: '${filename}'`);
    }
  }
}
