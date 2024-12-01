import { Component } from '@angular/core';

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
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        NavbarComponent,
        FooterComponent,
    ]
})
export class SignupPageComponent {}
