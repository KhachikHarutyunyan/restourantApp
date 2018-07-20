import { MaterialInstance } from './material.service';
import { ElementRef } from '@angular/core';

declare var M;
declare var autoplay;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
  next?(): void;
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
      // height: 600,
      dist: -100,
      padding: 0,
      duration: 300
    });
  }

  static parallax(ref: ElementRef) {
    return M.Parallax.init(ref.nativeElement);
  }

  static colaps(ref: ElementRef) {
    return M.Collapsible.init(ref.nativeElement, {
      accordion: false
    });
  }

}
