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
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { filter } from 'rxjs/operators';

export interface Facilities {
  userEmail?: string;
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
  facilityId?: number;
  courtType?: string | null | undefined;
  activities: string | null | undefined;
  pricePerHour: number | null | undefined;
  commissionPercentage: number | null | undefined;
  status?: string | null | undefined;
}

export interface Activity {
  id: number;
  activityCode: string;
  activityName: string;
  image: string | null;
  status: string | null;
}

export interface CourtTypes {
  id: number;
  courtType: string;
}

export interface UserEmails {
  id: number;
  email: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  facilityForm!: FormGroup;
  courtForm!: FormGroup;

  errorMessage!: string;

  uploading = false;
  fileList: NzUploadFile[] = [];

  tabs = [1, 2, 3];
  listOfParentData: Facilities[] = [];
  listOfChildrenData: Courts[] = [];
  size: 'large' | 'default' | 'small' = 'large';
  courtTypesForSelect: CourtTypes[] = [];
  activitiesForSelect: Activity[] = [];

  selectedValue: string | null = null; // Add this line

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  inputValue?: string;
  filteredOptions: string[] = [];
  options: string[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private http: HttpClient,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.facilityForm = this.fb.group({
      userEmail: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      facilityEmail: [null, [Validators.email, Validators.required]],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(9),
          Validators.maxLength(10),
        ],
      ],
      phoneNumberPrefix: ['+94'],
      profileUrl: [null, [Validators.required]],
    });

    this.courtForm = this.fb.group({
      facilityId: [null, [Validators.required as Validators]],
      courtType: [null, [Validators.required as Validators]],
      pricePerHour: [null, [Validators.required]],
      commissionPercentage: [null, [Validators.required]],
      activities: [[null], [Validators.required as Validators]],
    });

    this.adminService.getAllCourtActivities().subscribe({
      next: (activity) => {
        this.activitiesForSelect = activity;
      },
      error: (err) => (this.errorMessage = err),
    });

    this.adminService.getAllFacilities().subscribe({
      next: (facilities) => {
        this.listOfParentData = facilities;
      },
      error: (err) => (this.errorMessage = err),
    });

    this.adminService.getAllCourtTypes().subscribe({
      next: (courtTypes) => {
        console.log(courtTypes);

        this.courtTypesForSelect = courtTypes;
      },
      error: (err) => (this.errorMessage = err),
    });

    this.adminService.getAllUsersEmail().subscribe({
      next: (emails: UserEmails[]) => {
        this.options = emails.map((email) => email.email);
      },
      error: (err) => (this.errorMessage = err),
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

  onChange(value: string): void {
    this.filteredOptions = this.options.filter(
      (option) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  submitCourtForm(): void {
    console.log(this.courtForm);

    if (this.courtForm.valid) {
      const courtDetails: Courts = {
        facilityId: this.courtForm.value.facilityId,
        courtType: this.courtForm.value.courtType,
        pricePerHour: this.courtForm.value.pricePerHour,
        commissionPercentage: this.courtForm.value.commissionPercentage,
        activities: this.courtForm.value.activities,
      };

      console.log('createFacility: ' + courtDetails);
      console.log('loggg');
      this.adminService.createCourt(courtDetails).subscribe({
        next: () => {
          this.onSaveComplete();
          this.msg.success('Court saved successfully.');
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
          this.msg.error(err);
        },
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

  handleUpload(): void {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.fileList.forEach((file: any) => {
      formData.append('courtImages', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest(
      'POST',
      `http://localhost:3000/court/2/upload-files`,
      formData,
      {
        // reportProgress: true
      }
    );
    this.http
      .request(req)
      .pipe(filter((e) => e instanceof HttpResponse))
      .subscribe(
        (res) => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }

  submitForm(): void {
    if (this.facilityForm.valid) {
      const facilityDetails: Facilities = {
        userEmail: this.facilityForm.value.userEmail,
        name: this.facilityForm.value.name,
        address: this.facilityForm.value.address,
        city: this.facilityForm.value.city,
        facilityEmail: this.facilityForm.value.facilityEmail,
        contactNo: +this.facilityForm.value.contactNumber,
        profileUrl: this.facilityForm.value.profileUrl,
      };

      console.log('createFacility: ' + JSON.stringify(facilityDetails));
      this.adminService.createFacility(facilityDetails).subscribe({
        next: () => {
          this.onSaveComplete();
          this.msg.success('Facility saved successfully.');
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
          this.msg.error(err);
        },
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
