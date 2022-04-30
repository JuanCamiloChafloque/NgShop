import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@frontend/users';

@Component({
  selector: 'frontend-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('user');
    this.usersService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
