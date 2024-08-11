import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared/index';

@Component({
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrl: './about-page.component.scss',
   standalone: true,
   imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent],
})
export class AboutPageComponent {}
