import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutStateService {
  private showIconsOnly: boolean = false;

  constructor() {}

  toggleIconsOnly() {
    this.showIconsOnly = !this.showIconsOnly;
  }

  isIconsOnly(): boolean {
    return this.showIconsOnly;
  }
}