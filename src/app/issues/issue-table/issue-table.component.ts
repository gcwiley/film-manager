import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
export class IssueTableComponent implements OnInit {
   // fix this later
   isLoadingResults = true;

   // set up the data source
   dataSource = new MatTableDataSource<Issue>();

   // columns to display
   columnsToDisplay = ['title', 'artist', 'releaseDate', 'label', 'openAlbum', 'editAlbum', 'deleteAlbum'];

   constructor(private issueService: IssueService, private router: Router) {}

   ngOnInit(): void {
      this.getIssues();
   }

   // gets all issues from issue service
   getIssues(): void {
      this.issueService.getIssues().subscribe(() => {
         this.dataSource.data = issues;
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
