import { Component } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-announcement-banner',
   templateUrl: './announcement-banner.component.html',
   styleUrl: './announcement-banner.component.scss',
   imports: [],
})
export class AnnouncementBannerComponent {
   text = 'my film app is currently in development.';
}
