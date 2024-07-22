import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// import angular modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, CarouselComponent, FooterComponent, LogoComponent } from '../../shared';

@Component({
   selector: 'app-home-page',
   templateUrl: './home-page.component.html',
   styleUrl: './home-page.component.scss',
   standalone: true,
   imports: [
      RouterModule,
      MatCardModule,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      LogoComponent,
      NavbarComponent,
      AnnouncementBannerComponent,
      CarouselComponent,
      FooterComponent,
   ],
})
export class HomePageComponent {}
