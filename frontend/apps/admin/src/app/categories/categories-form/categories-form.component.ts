import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public editMode = false;
  public id = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
    this.checkEditMode();
  }

  checkEditMode() {
    this.route.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.editMode = true;
          this.id = params.id;
          this.categoriesService.getCategoryById(this.id).subscribe({
            next: (result) => {
              this.form.controls['name'].setValue(result.category.name);
              this.form.controls['icon'].setValue(result.category.icon);
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

    const category: Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
    };

    if (this.editMode) {
      this.categoriesService.updateCategory(this.id, category).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Category Updated',
            detail: 'The category was updated successfully',
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
            detail: 'The category could not be updated: ' + err.error.message,
          });
        },
      });
    } else {
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
}
