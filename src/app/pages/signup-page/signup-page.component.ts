import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { FooterComponent } from '../../components';

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
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatButtonModule,
      FooterComponent,
      MatIconModule,
   ],
})
export class SignupPageComponent {
   constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

   // create the signup with email and password fields
   public signUpForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
   });

   public onSubmitSignUp() {
      this.authService
         .createUserWithEmailAndPassword(this.signUpForm.value.email!, this.signUpForm.value.password!)
         .subscribe(() => {
            // redirects user to homepage
            this.router.navigateByUrl('/');
         });
   }
}
