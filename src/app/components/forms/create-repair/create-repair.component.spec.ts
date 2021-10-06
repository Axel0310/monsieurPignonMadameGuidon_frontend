import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRepairComponent } from './create-repair.component';

describe('CreateRepairComponent', () => {
  let component: CreateRepairComponent;
  let fixture: ComponentFixture<CreateRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
