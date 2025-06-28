import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// shared components
import {
  NavbarComponent,
  AuthStatusComponent,
  ActionBarComponent,
  FooterComponent,
} from '../../components';

// film components
import { FilmGridComponent, RecentFilmsComponent} from '../../films'

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NavbarComponent,
    AuthStatusComponent,
    FooterComponent,
    ActionBarComponent,
    FilmGridComponent,
    RecentFilmsComponent,
  ],
})
export class HomePageComponent {}
