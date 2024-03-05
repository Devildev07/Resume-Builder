import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModalComponent } from './modals/auth-modal/auth-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    AuthModalComponent,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'resume-builder-6dcc1',
        appId: '1:144213628994:web:490f476f97f2b86e16b5db',
        databaseURL:
          'https://resume-builder-6dcc1-default-rtdb.asia-southeast1.firebasedatabase.app',
        storageBucket: 'resume-builder-6dcc1.appspot.com',
        // locationId: 'asia-south1',
        apiKey: 'AIzaSyA6HP5S3EFSRcGvlUOUZTCcvyA5mCHwe1I',
        authDomain: 'resume-builder-6dcc1.firebaseapp.com',
        messagingSenderId: '144213628994',
        measurementId: 'G-JKB2259F3Q',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
})
export class AppModule {}
