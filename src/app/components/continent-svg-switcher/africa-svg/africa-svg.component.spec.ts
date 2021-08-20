import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfricaSvgComponent } from './africa-svg.component';

describe('AfricaSvgComponent', () => {
  let component: AfricaSvgComponent;
  let fixture: ComponentFixture<AfricaSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfricaSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfricaSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
