import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
})
export class ReservationPageComponent implements OnInit {
  checkedPayment = false;
  checked = false;
  size: NzButtonSize = 'large';
  constructor() {}

  ngOnInit(): void {}
}
