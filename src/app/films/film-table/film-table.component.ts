

@Component({
   standalone: true,
   selector: 'app-film-table',
   templateUrl: './film-table.component.html',
   styleUrl: './film-table.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
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
 
}
