import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'frontend-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  public form!: FormGroup;
  public isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
    };

    this.categoriesService.addCategory(category).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Category Added',
          detail: 'New category added successfully',
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
          summary: 'Category Error',
          detail: 'New category could not be added: ' + err.error.message,
        });
      },
    });
  }
}
