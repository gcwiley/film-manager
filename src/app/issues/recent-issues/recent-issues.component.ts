import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular material modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// import issue service
import { IssueService } from '../../services/issue.service';

// import the issue interface
import { Issue } from '../../types/issue.interface';


@Component({
  selector: 'app-recent-issues',
  templateUrl: './recent-issues.component.html',
  styleUrl: './recent-issues.component.scss',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentIssuesComponent implements OnInit {
  recentIssues!: Issue[];

  constructor(private issueService: IssueService) {}

  getRecentIssues(): void {
    this.issueService
  }
}
