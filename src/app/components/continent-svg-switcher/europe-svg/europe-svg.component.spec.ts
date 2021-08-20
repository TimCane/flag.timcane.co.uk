import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuropeSvgComponent } from './europe-svg.component';

describe('EuropeSvgComponent', () => {
  let component: EuropeSvgComponent;
  let fixture: ComponentFixture<EuropeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EuropeSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EuropeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
