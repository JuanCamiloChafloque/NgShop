import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { ButtonModule } from 'primeng/button';

export const uiRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule],
  declarations: [BannerComponent, SliderComponent],
  exports: [BannerComponent, SliderComponent],
})
export class UiModule {}
