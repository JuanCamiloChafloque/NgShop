import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'frontend-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  public loginFormGroup!: FormGroup;
  public isSubmitted = false;
  public error = false;
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';
    this.error = false;
    if (this.loginFormGroup.valid) {
      const email = this.loginFormGroup.controls['email'].value;
      const password = this.loginFormGroup.controls['password'].value;
      this.usersService.login(email, password).subscribe({
        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigate(['/']);
          /*if (result.user.isAdmin) {
            this.router.navigate(['/']);
          } else {
            this.error = true;
            this.errorMessage =
              'Unauthorized: Only administrators can login to this application';
          }*/
        },
        error: (err) => {
          this.error = true;
          this.errorMessage = err.error.message;
        },
      });
    }
  }
}
