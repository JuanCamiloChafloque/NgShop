import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-slider',
  templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit {
  @Input() images!: string[];

  public selectedImage = '';

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImage = this.images[0];
    }
  }

  changeSelectedImage(image: string) {
    this.selectedImage = image;
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}
