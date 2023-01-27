import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor() {}

  get onLangChange() {
    return new EventEmitter<any>();
  }

  /**
   * translate service mockup
   */
  instant(value) {
    return value;
  }
}
