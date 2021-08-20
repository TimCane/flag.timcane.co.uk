import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouthAmericaSvgComponent } from './south-america-svg.component';

describe('SouthAmericaSvgComponent', () => {
  let component: SouthAmericaSvgComponent;
  let fixture: ComponentFixture<SouthAmericaSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouthAmericaSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouthAmericaSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
