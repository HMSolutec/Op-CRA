import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'moment/locale/fr';
import moment from 'moment';

moment.locale("fr");
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
