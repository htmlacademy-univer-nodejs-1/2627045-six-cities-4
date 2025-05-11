import {inject, injectable} from 'inversify';
import { ConfigInterface } from '../shared/config/config.interface.js';
import { LoggerInterface } from '../shared/logger/logger.interface.js';
import { AppComponent } from '../shared/types/app-component.enum.js';
import { RestSchema } from '../shared/config/rest.shema.js';

@injectable()
export default class Application {
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
              @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>) {
  }

  public async init() {
    this.logger.info('Application init');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
