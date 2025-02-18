import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../components/index';

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrl: './about-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent]
})
export class AboutPageComponent {}
