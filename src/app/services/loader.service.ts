import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private count = 0;
  private spinner$ = new BehaviorSubject<boolean>(false);

  getSpinnerObserver() : Observable<boolean> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
      this.spinner$.next(true);
  }

  requestEnded() {
      this.spinner$.next(false);
  
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next(false);
  }
  
 
  
}
