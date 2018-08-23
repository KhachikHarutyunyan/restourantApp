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

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
}


export class MaterialService {

  static toggleMenu(ref: ElementRef): MaterialInstance {
    return M.Sidenav.init(ref.nativeElement);
  }

  static toast(message: string) {
    M.toast({ html: message });
  }

  static slider(ref: ElementRef) {
    return M.Carousel.init(ref.nativeElement, {
      fullWidth: true,
      indicators: true,
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

  static asideCart(ref: ElementRef): MaterialInstance {
    return M.Sidenav.init(ref.nativeElement, {
      edge: 'right'
    });
  }

  static updateTextInput() {
    M.updateTextFields();
  }

  static modal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement, {
      endingTop: '30%',
      inDuration: 500,
      outDuration: 500,
    });
  }

  static tooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static initDatePicker(ref: ElementRef, onClose: () => void) {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    });
  }

  static tapTarget(ref: ElementRef): MaterialInstance {
    return M.tapTarget.init(ref.nativeElement);
  }

}
