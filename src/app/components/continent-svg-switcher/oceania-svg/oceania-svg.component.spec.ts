import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceaniaSvgComponent } from './oceania-svg.component';

describe('OceaniaSvgComponent', () => {
  let component: OceaniaSvgComponent;
  let fixture: ComponentFixture<OceaniaSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceaniaSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OceaniaSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
