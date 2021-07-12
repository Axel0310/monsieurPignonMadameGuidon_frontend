import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsOverviewComponent } from './repairs-overview.component';

describe('RepairsOverviewComponent', () => {
  let component: RepairsOverviewComponent;
  let fixture: ComponentFixture<RepairsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
