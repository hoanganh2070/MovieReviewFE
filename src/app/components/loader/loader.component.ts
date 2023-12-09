import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit{
  
  showLoader: boolean = false;

  constructor(private loaderService : LoaderService, private cdRef : ChangeDetectorRef) {
    this.loaderService = loaderService;
   }

   ngOnInit(): void {
      this.init();
   }
  
   init(){
       this.loaderService.getSpinnerObserver().subscribe((status) => {
         this.showLoader = status === true;
         this.cdRef.detectChanges();
       });
   }
}
