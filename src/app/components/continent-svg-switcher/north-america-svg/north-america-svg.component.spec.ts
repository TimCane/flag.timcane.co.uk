import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthAmericaSvgComponent } from './north-america-svg.component';

describe('NorthAmericaSvgComponent', () => {
  let component: NorthAmericaSvgComponent;
  let fixture: ComponentFixture<NorthAmericaSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NorthAmericaSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NorthAmericaSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
