import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { User } from './user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  validateForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private signUpService: SignUpService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required]],
      phoneNumberPrefix: ['+94'],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const userDetails: User = {
        firstName: this.validateForm.value.firstName,
        lastName: this.validateForm.value.lastName,
        email: this.validateForm.value.email,
        phoneNumber: +this.validateForm.value.phoneNumber,
        password: this.validateForm.value.password,
      };

      console.log('sighUp: ' + JSON.stringify(userDetails));
      this.signUpService.createUser(userDetails).subscribe({
        next: () => this.onSaveComplete(),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.validateForm.reset();
    // this.router.navigate(['/products']);
  }
}
