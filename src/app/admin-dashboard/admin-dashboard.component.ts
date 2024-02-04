import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../sign-up/user';
import { SignUpService } from '../sign-up/sign-up.service';

import { AdminService } from './admin.service';

export interface Facilities {
  id?: number;
  name: string;
  address: string;
  city: string;
  contactNo: number | string;
  facilityEmail: string;
  profileUrl: string;
  status?: string;
  expand?: boolean;
  courts?: Courts;
}

export interface Courts {
  id?: number | null | undefined;
  courtType?: string | null | undefined;
  activities: string | null | undefined;
  pricePerHour: number | null | undefined;
  commissionPercentage: number | null | undefined;
  status: string | null | undefined;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  facilityForm!: FormGroup;
  errorMessage!: string;

  tabs = [1, 2, 3];
  listOfParentData: Facilities[] = [];
  listOfChildrenData: Courts[] = [];
  size: 'large' | 'default' | 'small' = 'large';

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.facilityForm = this.fb.group({
      userEmail: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      facilityEmail: [null, [Validators.email, Validators.required]],
      contactNumber: [null, [Validators.required]],
      phoneNumberPrefix: ['+94'],
      profileUrl: [null, [Validators.required]],
    });

    // this.adminService.getAllFacilities().subscribe({
    //   next: (facilities) => {
    //     for (const data of facilities) {
    //       const facility = {
    //         name: data.name,
    //         address: data.address,
    //         city: data.city,
    //         contactNo: data.contactNo,
    //         facilityEmail: data.facilityEmail,
    //         profileUrl: data.profileUrl,
    //         status: data.status,
    //       };

    //       const court = {
    //         courtType: data.courts?.courtType, // provide a default value
    //         activities: data.courts?.activities, // provide a default value
    //         pricePerHour: data.courts?.pricePerHour, // provide a default value
    //         commissionPercentage: data.courts?.commissionPercentage, // provide a default value
    //         status: data.courts?.status, // provide a default value
    //       };

    //       this.listOfParentData.push(facility);
    //       this.listOfChildrenData.push(court);
    //     }

    //     console.log(this.listOfChildrenData);
    //   },
    //   error: (err) => (this.errorMessage = err),
    // });

    for (let i = 0; i < 50; ++i) {
      this.listOfParentData.push({
        id: i,
        name: 'Screem',
        address: 'This is production name',
        city: '10.3.4.5654',
        contactNo: 500,
        facilityEmail: 'Jack',
        profileUrl: '2014-12-24 23:12:00',
        status: 'active',
        expand: false,
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.listOfChildrenData.push({
        id: i,
        courtType: 'type test',
        activities: 'Cricket',
        pricePerHour: 5000,
        commissionPercentage: 5,
        status: 'active',
      });
    }
  }

  submitForm(): void {
    if (this.facilityForm.valid) {
      const facilityDetails: Facilities = {
        // userEmail: this.facilityForm.value.userEmail,
        name: this.facilityForm.value.name,
        address: this.facilityForm.value.address,
        city: this.facilityForm.value.city,
        facilityEmail: this.facilityForm.value.facilityEmail,
        contactNo: +this.facilityForm.value.contactNumber,
        profileUrl: this.facilityForm.value.profileUrl,
      };

      console.log('createFacility: ' + JSON.stringify(facilityDetails));
      this.adminService.createFacility(facilityDetails).subscribe({
        next: () => this.onSaveComplete(),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      Object.values(this.facilityForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.facilityForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.facilityForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.facilityForm.reset();
    // this.router.navigate(['/products']);
  }
}
