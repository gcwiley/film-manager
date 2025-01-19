import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   DestroyRef,
   OnDestroy,
   OnInit,
   ViewChild,
   effect,
   inject,
   signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
// import the film dto
import { FilmDto } from '../../types/film.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import film service
import { FilmService } from '../../services/film.service';
// import angular material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
   selector: 'app-film-table',
   templateUrl: './film-table.component.html',
   styleUrl: './film-table.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   animations: [
      trigger('detailExpand', [
         state('collapsed', style({ height: '0px', minHeight: '0' })),
         state('expanded', style({ height: '*' })),
         transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1')),
      ]),
   ],
   imports: [
      FormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatPaginatorModule,
      MatSortModule,
      MatTableModule,
      MatTooltipModule,
      PortalModule,
      RouterLink,
   ],
})
export class FilmTableComponent implements OnInit, OnDestroy {
   @ViewChild(CdkPortal, { static: true }) public portalContent!: CdkPortal;

   // columns to be displayed in the table
   public readonly displayedColumns: string[] = ['id', 'title', 'actions'];
   public readonly displayedColumnsExpanded = [...this.displayedColumns, 'expand'];
   // sets up the page size options for the table
   public readonly pageSizeOptions = [5, 10, 25, 100];
   // sets up a signal that will hold the film data, starting with an empty array. This will later be populated with data from the film service.
   public data = signal<FilmDto[]>([]);
   public totalCount = signal(0);

   // query signal allows the user to filter the data by provided a string to search by
   public query = signal('');
   // controls how many items are displayed per page
   public pageSize = signal(5);
   // controls which page the user is on
   public pageIndex = signal(1);
   // specifies which property of the FilmDto type to use for sorting
   public sortBy = signal<keyof FilmDto>('id');
   // determines whether to use ascending or descending order - set for ascending.
   public sortDirection = signal<'asc' | 'desc'>('asc');

   // used to store a FilmDto object or null, depending on if the row is expanded or not
   public expandedElement: FilmDto | null = null;
   // injects the DestroyRef service which provides a way to manage the destruction of the component.
   private destroyRef = inject(DestroyRef);

   // constructors are used to inject services in the component
   constructor(
      // uses filmservice to get data from it
      private filmService: FilmService,
      // router instance is used to navigate to a new page
      private router: Router,
      // used to get the route params
      private route: ActivatedRoute,
      // it's used to detect the changes
      private cdr: ChangeDetectorRef
   ) {
      // effect method is used to automatically update the data when necessary
      effect(() => {
         this.filmService
            .getFilms({
               // the current page the user is
               page: this.pageIndex(),
               // number of items per page
               limit: this.pageSize(),
               // this is the sorting name
               sort: this.sortBy(),
               // this is the order
               order: this.sortDirection(),
               query: this.query(),
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((films) => {
               this.data.set(films.items);
               this.totalCount.set(films.totalCount);
            });
      });
   }

   // this is a lifecycle hook in angular that gets called when a component is about to be destroyed. It's the place where you preform cleanup tasks
   public ngOnDestroy(): void {
      // portals are a way to dynamically insert content into your application's view, outside of the normal component hierarchy. 
      // detach method removes the portal's content from the view.
      this.portalContent?.detach();
   }

   // comment
   
}
