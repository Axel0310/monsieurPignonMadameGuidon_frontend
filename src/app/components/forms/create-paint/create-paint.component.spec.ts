import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaintComponent } from './create-paint.component';

describe('CreatePaintComponent', () => {
  let component: CreatePaintComponent;
  let fixture: ComponentFixture<CreatePaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
