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
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
// import film service
import { FilmService } from '../../services/film.service';
// import breadcrumbsPortal Service
import { BreadcrumbsPortalService } from '../../services/breadcrumbs-portal.service';
// import angular material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
// comment
import { combineLatest, debounceTime } from 'rxjs';
import { FilmDeleteDirective } from '../../directives/film-delete.directive';

// import rxjs helper functions
import { getParamPage } from '../../rxjs/get-param-page';
import { getParamQuery } from '../../rxjs/get-param-query';
import { getParamSort } from '../../rxjs/get-param-sort';

@Component({
   standalone: true,
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
      FilmDeleteDirective,
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
      // inject the service
      private breadcrumbsPortalService: BreadcrumbsPortalService,
      // router instance is used to navigate to a new page
      private router: Router,
      // used to get the route params
      private route: ActivatedRoute,
      // it's used to detect the changes
      private cdr: ChangeDetectorRef
   ) {
      // effect method is used to automatically update the data when necessary
      effect(() => {
         // get the film data
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

   public ngOnInit(): void {
      setTimeout(() => {
         this.breadcrumbsPortalService.setPortal(this.portalContent); // set the portal
         this.cdr.detectChanges(); // detect changes
      });
      // get the params
      combineLatest([
         this.route.queryParamMap.pipe(getParamPage()),
         this.route.queryParamMap.pipe(getParamQuery()),
         this.route.queryParamMap.pipe(getParamSort()),
      ])
         .pipe(debounceTime(1000), takeUntilDestroyed(this.destroyRef))
         .subscribe(([page, query, sort]) => {
            this.query.set(query);
            this.pageIndex.set(page.pageIndex || 1);
            this.pageSize.set(page.pageSize || 5);
            this.sortBy.set(sort.sortBy || 'id');
            this.sortDirection.set(sort.sortDirection || 'asc');
         });
   }

   // comment
   public onSortChange(event: Sort): void {
      this.setFilterstoRoute({
         sortBy: event.active,
         sortDirection: event.direction,
         pageIndex: null,
      });
   }

   // comment
   public onPageChange(event: PageEvent): void {
      let pageIndex = null;
      if (event.pageSize === this.pageSize()) {
         pageIndex = event.pageIndex + 1 > 1 ? event.pageIndex + 1 : null;
      }
      this.setFilterstoRoute({
         pageIndex,
         pageSize: event.pageSize,
      });
   }

   // comment
   public onQueryChange(event: Event): void {
      const query = (event.target as HTMLInputElement).value;
      this.setFilterstoRoute({
         query: query ? encodeURIComponent(query) : null,
         pageIndex: null,
      });
   }

   // comment
   public onQueryRemove(): void {
      this.setFilterstoRoute({
         query: null,
         pageIndex: null,
      });
   }

   // comment
   public onClear(): void {
      this.setFilterstoRoute({
         query: null,
         pageIndex: null,
         pageSize: null,
         sortBy: null,
         sortDirection: null,
      });
   }

   // expands rows to show more details
   public onExpand(event: Event, element: FilmDto): void {
      this.expandedElement = this.expandedElement === element ? null : element;
      this.cdr.markForCheck(); // mark for check
      event.stopPropagation(); // stop the event
   }

   // comment
   public trackByFilmId(_: number, target: FilmDto): string {
      // return the id
      return target.id;
   }

   // comment
   private setFilterstoRoute(queryParams?: Params | null): void {
      // navigate to the route
      this.router.navigate([], {
         queryParams, // the params
         queryParamsHandling: 'merge', // the query params
         replaceUrl: true, // replace the url
      });
   }

   // defines the onDeleted method
   public onDeleted(id: string): void {
      // update the data
      this.data.update((value) => value.filter((i) => i.id !== id));
   }
}
