import {inject, injectable} from 'inversify';
import { AppComponent } from '../shared/types/app-component.js';
import { RestSchema } from '../shared/config/rest.shema.js';
import { ConfigInterface } from '../shared/config/config.interface.js';

@injectable()
export default class Application {
  constructor(@inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>) {
  }

  public async init() {
  }
}
