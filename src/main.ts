import 'reflect-metadata';
import Application from './app/rest.js';
import {Container} from 'inversify';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { AppComponent } from './shared/types/app-component.enum.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const application = mainContainer.get<Application>(AppComponent.Application);
  await application.init();
}

bootstrap().then((value) => console.log(value));
