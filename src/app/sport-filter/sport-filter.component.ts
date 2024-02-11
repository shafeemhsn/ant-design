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

  activities = [
    { name: 'Swimming', image: '/assets/images/swimming.jpg' },
    { name: 'Cricket', image: '/assets/images/cricket.png' },
    { name: 'Football', image: '/assets/images/football.png' },
    { name: 'Badminton', image: '/assets/images/badminton.png' },
    { name: 'Futsal', image: '/assets/images/futsal.png' },
    { name: 'Volleyball', image: '/assets/images/volleyball.png' },
    { name: 'Table Tennis', image: '/assets/images/table-tennis.png' },
    { name: 'Basketball', image: '/assets/images/basketball.png' },
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllFacilitiesForHomePage().subscribe({
      next: (courts) => {
        this.courtGrid = courts;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onSportFilter(sport: string): void {
    console.log(sport);
  }
}
