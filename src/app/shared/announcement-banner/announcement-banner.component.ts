import { Component } from '@angular/core';

@Component({
    selector: 'app-announcement-banner',
    imports: [],
    templateUrl: './announcement-banner.component.html',
    styleUrl: './announcement-banner.component.scss'
})
export class AnnouncementBannerComponent {
   text = 'my film app is currently in development.';
}