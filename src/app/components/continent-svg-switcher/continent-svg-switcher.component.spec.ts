import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinentSvgSwitcherComponent } from './continent-svg-switcher.component';

describe('ContinentSvgSwitcherComponent', () => {
  let component: ContinentSvgSwitcherComponent;
  let fixture: ComponentFixture<ContinentSvgSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinentSvgSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinentSvgSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
