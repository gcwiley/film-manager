import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { NavbarComponent, FooterComponent } from '../../shared';

// import the auth service
import { AuthService } from '../../services/auth.service';

@Component({
   selector: 'app-signin-page',
   templateUrl: './signin-page.component.html',
   styleUrl: './signin-page.component.scss',
   standalone: true,
   imports: [
      ReactiveFormsModule,
      NgIf,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatButtonModule,
      MatIconModule,
      NavbarComponent,
      FooterComponent,
   ],
})
export class SigninPageComponent {
   year = new Date().getFullYear();

   // inject the router, form builder, and the auth service
   constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private authService: AuthService
   ) {}

   // create the signin form with email and password fields
   signinForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required]
   });

   // Sign in with email and password
  // if successful, navigate admin to the main page
  onSubmitSignIn() {
   window.alert('Under construction!')
 }
}
