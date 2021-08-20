import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiaSvgComponent } from './asia-svg.component';

describe('AsiaSvgComponent', () => {
  let component: AsiaSvgComponent;
  let fixture: ComponentFixture<AsiaSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsiaSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsiaSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
