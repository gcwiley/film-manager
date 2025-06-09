import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
   standalone: true,
   selector: 'app-carousel-container',
   templateUrl: './carousel-container.component.html',
   styleUrl: './carousel-container.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatDividerModule, MatIconModule],
})
export class CarouselContainerComponent {}
