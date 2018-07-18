import { MaterialInstance } from './material.service';
import { ElementRef } from '@angular/core';

declare var M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}


export class MaterialService {

  static toggleMenu(ref: ElementRef): MaterialInstance {
    return M.Sidenav.init(ref.nativeElement);
  }

  static toast(message: string) {
    M.toast({html: message});
  }

  static slider(ref: ElementRef) {
    return M.Carousel.init(ref.nativeElement, {
      fullWidth: true,
      indicators: true,
      // height: 1500,
      // transition: 500,
      dist: 100,
      dragged: true,
      duration: 200
    });
  }

}

