import { HostListener, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private $windowWidth: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private $isMobileView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.$windowWidth.subscribe((width) =>
      this.$isMobileView.next(width < 768)
    );
  }

  setWindowWidth(width: number) {
    this.$windowWidth.next(width);
  }

  getIsMobileView(): Observable<boolean> {
    return this.$isMobileView.asObservable();
  }
}
