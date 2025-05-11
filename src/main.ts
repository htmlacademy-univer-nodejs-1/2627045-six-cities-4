import Application from './app/rest.js';
import { ConfigInterface } from './shared/config/config.interface.js';
import ConfigService from './shared/config/config.service.js';
import { LoggerInterface } from './shared/logger/logger.interface.js';
import PinoService from './shared/logger/pino.service.js';
import {Container} from 'inversify';
import { AppComponent } from './shared/types/app-component.enum.js';
import { RestSchema } from './shared/config/rest.shema.js';

async function bootstrap() {
  const container = new Container();
  container.bind<Application>(AppComponent.Application).to(Application).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  const application = container.get<Application>(AppComponent.Application);
  await application.init();
}

bootstrap();
