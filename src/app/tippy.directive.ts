import { Directive, ElementRef, Input } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[tippy]'
})
export class TippyDirective {

  @Input('tippyOptions') public tippyOptions: Object | undefined;

  constructor(private el: ElementRef) {
    this.el = el;
  }

  public ngOnInit() {
    tippy(this.el.nativeElement, this.tippyOptions || {});
  }
}
