import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, FooterComponent} from '../../shared'


@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password-page.component.html',
    styleUrl: './reset-password-page.component.scss',
    imports: [NavbarComponent, FooterComponent]
})
export class ResetPasswordPageComponent {}
