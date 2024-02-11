import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayHereCheckoutComponent } from './pay-here-checkout.component';

describe('PayHereCheckoutComponent', () => {
  let component: PayHereCheckoutComponent;
  let fixture: ComponentFixture<PayHereCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayHereCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayHereCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
