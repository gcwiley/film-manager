import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { NavbarComponent, FooterComponent } from '../../shared';

@Component({
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
      MatIconModule,
      NavbarComponent,
      FooterComponent,
   ],
})
export class SignupPageComponent {
   public form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
   });

   constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {}

   public onSubmit(): void {
      if (this.form.invalid) {
         return;
      }

      from(
         createUserWithEmailAndPassword(this.auth, this.form.controls.email.value, this.form.controls.password.value)
      ).subscribe(() => {
         this.router.navigate(['/']);
      });
   }
}
