import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared/index';

// import issue components
import { IssueFormComponent, RecentIssuesComponent } from '../../issues';

@Component({
   selector: 'app-feedback-page',
   templateUrl: './feedback-page.component.html',
   styleUrl: './feedback-page.component.scss',
   standalone: true,
   imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent, IssueFormComponent, RecentIssuesComponent],
})
export class FeedbackPageComponent {}
