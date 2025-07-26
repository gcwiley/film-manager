

@Component({
  standalone: true,
  selector: 'app-film-table',
  templateUrl: './film-table.component.html',
  styleUrl: './film-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class FilmTableComponent implements OnInit, OnDestroy {}
