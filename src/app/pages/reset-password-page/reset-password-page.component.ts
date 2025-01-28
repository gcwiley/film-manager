import { Component } from '@angular/core';

import { sendPasswordResetEmail } from 'firebase/auth'

// import the shared components
import { NavbarComponent, FooterComponent} from '../../components'


@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password-page.component.html',
    styleUrl: './reset-password-page.component.scss',
    imports: [NavbarComponent, FooterComponent]
})
export class ResetPasswordPageComponent {}
