import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  size: NzButtonSize = 'large';
  selectedValue = null;
  time: Date | null = null;
  isCollapsed = false;
  constructor() {}

  ngOnInit(): void {}

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }

  log(): void {
    console.log('click dropdown button');
  }
}
