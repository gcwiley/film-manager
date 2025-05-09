import { ChangeDetectionStrategy, Component } from '@angular/core';

// import angular material
import { MatDividerModule } from '@angular/material/divider';

// import the shared components
import {
   NavbarComponent,
   AnnouncementBarComponent,
   FooterComponent,
} from '../../../components';

// import the film grid component
import { FilmListComponent } from '../../../films';

@Component({
   standalone: true,
   selector: 'app-film-grid-page',
   templateUrl: './film-grid-page.component.html',
   styleUrl: './film-grid-page.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      MatDividerModule,
      NavbarComponent,
      AnnouncementBarComponent,
      FooterComponent,
      FilmListComponent,
   ],
})
export class FilmGridPageComponent {}
