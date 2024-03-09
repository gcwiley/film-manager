import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentFilmsComponent } from './recent-films.component';

describe('RecentFilmsComponent', () => {
  let component: RecentFilmsComponent;
  let fixture: ComponentFixture<RecentFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentFilmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
