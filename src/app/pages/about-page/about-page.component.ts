import { Component } from '@angular/core';

// import the shared components
import { HeaderComponent, FooterComponent } from '../../shared/index';

@Component({
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrl: './about-page.component.scss',
   standalone: true,
   imports: [HeaderComponent, FooterComponent],
})
export class AboutPageComponent {}
