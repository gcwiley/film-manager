import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// import the film service
import { FilmService } from '../../services/film.service';

// import the film interface
import { Film } from '../../types/film.interface';

@Component({
   selector: 'app-film-form',
   templateUrl: './film-form.component.html',
   styleUrl: './film-form.component.scss',
   standalone: true,
   imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FormsModule,
      ReactiveFormsModule,
   ],
})
export class FilmFormComponent implements OnInit {
   formBuilder = inject(FormBuilder);

   public mode = 'create';
   private id!: string | null;
   private film!: Film;

   constructor(private router: Router, public route: ActivatedRoute, private filmService: FilmService) {}

   // create the film form
   filmForm = this.formBuilder.group({
      // fix this!
   })
}
