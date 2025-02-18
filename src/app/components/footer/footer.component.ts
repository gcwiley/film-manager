import { Component } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrl: './footer.component.scss',
   imports: [],
})
export class FooterComponent {
   version = VERSION.full;

   year = new Date().getFullYear();
}
