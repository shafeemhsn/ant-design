import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sport-filter',
  templateUrl: './sport-filter.component.html',
  styleUrls: ['./sport-filter.component.css'],
})
export class SportFilterComponent implements OnInit {
  nzSpan = 2.5;
  constructor() {}

  ngOnInit(): void {}
  sports = [
    'Futsal',
    'Cricket',
    'Volleyball',
    'Tennis',
    'Badminton',
    'Swimming',
    'Basketball',
    'Table Tennis',
  ];

  onSportFilter(sport: string): void {
    console.log(sport);
  }
}
