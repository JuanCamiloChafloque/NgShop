import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '@frontend/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { AuthGuardService, UsersModule } from '@frontend/users';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/form',
        component: UsersFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },
      {
        path: 'orders/:id',
        component: OrdersDetailComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    ConfirmDialogModule,
    ColorPickerModule,
    TagModule,
    FieldsetModule,
    ToolbarModule,
    UsersModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
