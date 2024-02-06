import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../admin-dashboard/admin.service';

export interface FacilityHomepage {
  facilityId?: number;
  facilityName?: string;
  facilityLocation?: string;
  profileUrl?: string;
  courts: CourtHomepage;
}

export interface CourtHomepage {
  courtId?: number;
  courtType?: string;
  pricePerHr?: number;
  activities?: string[];
  courtImage?: string[];
}

export interface CourtGrid {
  name?: number;
  location?: string;
  type?: number;
  activity: string[];
  price?: string;
  imageUrl: string[];
}

@Component({
  selector: 'app-sport-filter',
  templateUrl: './sport-filter.component.html',
  styleUrls: ['./sport-filter.component.css'],
})
export class SportFilterComponent implements OnInit {
  nzSpan = 2.5;

  courtGrid: any[] = [];
  errorMessage: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllFacilitiesForHomePage().subscribe({
      next: (courts) => {
        this.courtGrid = courts;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
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
