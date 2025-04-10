import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

// import the shared components
import {
  NavbarComponent,
  AnnouncementBannerComponent,
  AuthStatusComponent,
  FooterComponent,
} from '../../components';

// import the auth service
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
    AnnouncementBannerComponent,
    AuthStatusComponent,
    FooterComponent,
  ],
})
export class SignupPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  // create the signup with email and password fields
  public signUpForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  // sign up a new user with email and password, if successfull, navigate new user to the home page
  public onSubmitSignUp() {
    // if the form has validation errors, it returns early without doing anything
    if (this.signUpForm.invalid) {
      return;
    }

    this.authService
      .createUserWithEmailAndPassword(this.signUpForm.value.email!, this.signUpForm.value.password!)
      .subscribe({
        next: () => {
          // navigates user to homepage
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.snackbar.open('Unable to create new account', 'CLOSE', {
            duration: 3000,
          });
        },
      });
  }
}
