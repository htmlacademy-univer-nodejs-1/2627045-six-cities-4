import {config} from 'dotenv';
import { ConfigInterface } from './config.interface.js';
import { injectable } from 'inversify';
import { configRestSchema, RestSchema } from './rest.shema.js';

@injectable()
export default class ConfigService implements ConfigInterface<RestSchema> {
  private readonly config: RestSchema;

  constructor() {
    const parsedOutput = config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file');
    }
    configRestSchema.load({});
    this.config = configRestSchema.getProperties();
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
