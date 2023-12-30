import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutPageComponent } from './cout-page.component';

describe('CoutPageComponent', () => {
  let component: CoutPageComponent;
  let fixture: ComponentFixture<CoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
