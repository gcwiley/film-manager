import { AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import mat paginator and mat sort
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// import mat dialog here
import {
   MatDialog,
   MatDialogActions,
   MatDialogClose,
   MatDialogContent,
   MatDialogRef,
   MatDialogTitle,
} from '@angular/material/dialog';

// import issue service
import { IssueService } from '../../services/issue.service';

// import the issue interface
import { Issue } from '../../types/issue.interface';

@Component({
   selector: 'app-issue-table',
   templateUrl: './issue-table.component.html',
   styleUrl: './issue-table.component.scss',
   standalone: true,
   imports: [
      CommonModule,
      MatRippleModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      RouterModule,
   ],
})
export class IssueTableComponent implements AfterViewInit {
   // inject MatDialog
   readonly dialog = inject(MatDialog);

   // setup pagination for table
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   // set up sort in table
   @ViewChild(MatSort) sort!: MatSort;

   // set the loading spinner to true
   isLoadingResults = true;

   // set up the data source
   dataSource = new MatTableDataSource<Issue>();

   // columns to display
   columnsToDisplay = ['title', 'artist', 'releaseDate', 'label', 'openAlbum', 'editAlbum', 'deleteAlbum'];

   // comment
   constructor(private issueService: IssueService, private router: Router) {}

   // comment here
   ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // get issue functions here
   }

   // gets all issues from issue service
   getIssues(): void {
      this.issueService.getIssues().subscribe(() => {
         this.dataSource.data = issues;
      });
   }

   // open dialog window
   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(IssueTableDialogComponent, {
         width: '250px',
         enterAnimationDuration,
         exitAnimationDuration,
      });
   }

   // deletes an issue
   onDeleteIssue(id: string): void {
      this.issueService.deleteIssue(id).subscribe(() => {
         // navigates admin back to the admin page
         this.router.navigateByUrl('/film');
      });
   }
}

@Component({
   selector: 'app-issue-table-dialog',
   templateUrl: './issue-table-dialog.html',
   standalone: true,
   imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueTableDialogComponent {
   readonly dialogRef = inject(MatDialogRef<IssueTableDialogComponent>);
}
