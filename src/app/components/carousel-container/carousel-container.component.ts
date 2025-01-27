import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-carousel-container',
   templateUrl: './carousel-container.component.html',
   styleUrl: './carousel-container.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [],
})
export class CarouselContainerComponent {}
