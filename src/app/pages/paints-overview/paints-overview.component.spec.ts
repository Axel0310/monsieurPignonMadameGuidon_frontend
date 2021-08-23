import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintsOverviewComponent } from './paints-overview.component';

describe('PaintsOverviewComponent', () => {
  let component: PaintsOverviewComponent;
  let fixture: ComponentFixture<PaintsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
