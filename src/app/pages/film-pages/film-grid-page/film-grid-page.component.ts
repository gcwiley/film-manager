import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';

// shared components
import {
   NavbarComponent,
   FooterComponent,
} from '../../../components';

@Component({
   standalone: true,
   selector: 'app-film-grid-page',
   templateUrl: './film-grid-page.component.html',
   styleUrl: './film-grid-page.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      MatDividerModule,
      NavbarComponent,
      FooterComponent,
   ],
})
export class FilmGridPageComponent {}
