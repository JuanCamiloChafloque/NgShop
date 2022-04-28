import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event } from '@angular/router';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'frontend-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  public form!: FormGroup;
  public categories: Category[] = [];
  public isSubmitted = false;
  public editMode = false;
  public id = '';
  public file!: any;
  public imageDisplay!: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [false],
    });
    this.checkEditMode();
    this.categoriesService.getCategories().subscribe({
      next: (result) => {
        this.categories = result.categories;
      },
    });
  }

  checkEditMode() {
    this.route.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.editMode = true;
          this.id = params.id;
          this.productsService.getProductById(this.id).subscribe({
            next: (result) => {
              this.form.controls['name'].setValue(result.product.name);
              this.form.controls['brand'].setValue(result.product.brand);
              this.form.controls['price'].setValue(result.product.price);
              this.form.controls['countInStock'].setValue(
                result.product.countInStock
              );
              this.form.controls['category'].setValue(
                result.product.category._id
              );
              this.form.controls['description'].setValue(
                result.product.description
              );
              this.form.controls['isFeatured'].setValue(
                result.product.isFeatured
              );
              this.form.controls['richDescription'].setValue(
                result.product.richDescription
              );
              this.imageDisplay = result.product.image;
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

    const product = new FormData();
    product.append('name', this.form.controls['name'].value);
    product.append('brand', this.form.controls['brand'].value);
    product.append('price', this.form.controls['price'].value);
    product.append('countInStock', this.form.controls['countInStock'].value);
    product.append('category', this.form.controls['category'].value);
    product.append('description', this.form.controls['description'].value);
    product.append(
      'richDescription',
      this.form.controls['richDescription'].value
    );
    product.append('isFeatured', this.form.controls['isFeatured'].value);
    if (this.file) {
      product.append('image', this.form.controls['image'].value);
    }

    if (this.editMode) {
      this.productsService.updateProduct(this.id, product).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Product Updated',
            detail: 'The product was updated successfully',
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
            summary: 'Product Error',
            detail: 'The product could not be updated: ' + err.error.message,
          });
        },
      });
    } else {
      this.productsService.addProduct(product).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Product Added',
            detail: 'New product added successfully',
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
            summary: 'Product Error',
            detail: 'New product could not be added: ' + err.error.message,
          });
        },
      });
    }
  }

  onImageUpload(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.form.patchValue({ image: this.file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(this.file);
    }
  }
}
