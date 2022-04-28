import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit {
  public users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (result) => {
        this.users = result.users;
      },
    });
  }

  updateUser(id: string) {
    this.router.navigate(['users/form/' + id]);
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'User Deleted',
              detail: 'The user was deleted successfully',
            });
            this.usersService.getUsers().subscribe({
              next: (result) => {
                this.users = result.users;
              },
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'User Error',
              detail: 'User could not be deleted: ' + err.error.message,
            });
          },
        });
      },
    });
  }
}
