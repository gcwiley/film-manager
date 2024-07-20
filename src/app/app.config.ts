// comment here
import { ApplicationConfig } from '@angular/core';

// import the router helper function
import { provideRouter } from '@angular/router';

//  import the animation function
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import the firebase libraries
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';

// import the env variables - fix this!
import { environment } from '../environments/environment';

// import the routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
      // sets up providers necessary to enable Router functionality for the application
      provideRouter(routes),
      // comment
      provideAnimationsAsync(),
      // creates and initializes a firebase app instance
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      // comment
      provideFirestore(() => getFirestore()),
      // comment
      provideAuth(() => getAuth()),
      // comment
      provideFunctions(() => getFunctions()),
      // comment
      provideStorage(() => getStorage()),
      // comment
      provideMessaging(() => getMessaging()),
   ],
};
