import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { FooterComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FooterComponent],
})
export class ErrorPageComponent {}
