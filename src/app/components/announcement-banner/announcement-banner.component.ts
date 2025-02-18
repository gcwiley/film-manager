import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-announcement-banner',
   templateUrl: './announcement-banner.component.html',
   styleUrl: './announcement-banner.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [],
})
export class AnnouncementBannerComponent {}
