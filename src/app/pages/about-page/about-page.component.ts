import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import {
   NavbarComponent,
   FooterComponent,
} from '../../components/index';

@Component({
   standalone: true,
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrl: './about-page.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [NavbarComponent, FooterComponent],
})
export class AboutPageComponent {}
