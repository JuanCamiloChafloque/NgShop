import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;

@Component({
  selector: 'frontend-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent implements OnInit {
  public form!: FormGroup;
  public isSubmitted = false;
  public editMode = false;
  public id = '';
  public countries!: any;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      city: [''],
      zip: [''],
      country: [''],
    });
    this.getCountries();
    this.checkEditMode();
  }

  getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  checkEditMode() {
    this.route.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.editMode = true;
          this.id = params.id;
          this.usersService.getUserById(this.id).subscribe({
            next: (result) => {
              this.form.controls['name'].setValue(result.user.name);
              this.form.controls['email'].setValue(result.user.email);
              this.form.controls['password'].setValue(result.user.password);
              this.form.controls['isAdmin'].setValue(result.user.isAdmin);
              this.form.controls['phone'].setValue(result.user.phone);
              this.form.controls['street'].setValue(result.user.street);
              this.form.controls['apartment'].setValue(result.user.apartment);
              this.form.controls['city'].setValue(result.user.city);
              this.form.controls['zip'].setValue(result.user.zip);
              this.form.controls['country'].setValue(result.user.country);
            },
          });
        }
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      password: this.form.controls['password'].value,
      isAdmin: this.form.controls['isAdmin'].value,
      street: this.form.controls['street'].value,
      apartment: this.form.controls['apartment'].value,
      city: this.form.controls['city'].value,
      zip: this.form.controls['zip'].value,
      country: this.form.controls['country'].value,
    };

    if (this.editMode) {
      this.usersService.updateUser(this.id, user).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'User Updated',
            detail: 'The user was updated successfully',
          });
          timer(2000).subscribe({
            next: () => {
              this.location.back();
            },
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'User Error',
            detail: 'The user could not be updated: ' + err.error.message,
          });
        },
      });
    } else {
      this.usersService.addUser(user).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'User Added',
            detail: 'New user added successfully',
          });
          timer(2000).subscribe({
            next: () => {
              this.location.back();
            },
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'User Error',
            detail: 'New user could not be added: ' + err.error.message,
          });
        },
      });
    }
  }
}
