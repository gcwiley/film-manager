// import the config function
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
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

// import the env variables
import { environment } from '../environments/environment';

// import the routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // sets up providers necessary to enable Router functionality for the application
    provideRouter(routes),
    //  enable animations in an application
    provideAnimationsAsync(),
    // creates and initializes an firebase app instance
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // creates and initializes a firestore instance
    provideFirestore(() => getFirestore()),
    // creates and initializes an auth instance
    provideAuth(() => getAuth()),
    // registers a set of functions obtained by 'getFunctions' to be available for dependency injection.
    provideFunctions(() => getFunctions()),
    // creates and initializes a firebase storage instance
    provideStorage(() => getStorage()),
    // creates and initializes a Firebase Cloud Messaging instance
    provideMessaging(() => getMessaging()),
    // comment
    provideDatabase(() => getDatabase()),
    // sets up the necessary providers to get all angular firebase functionalities up and running.
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
};
