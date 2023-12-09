import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const status = inject(AccountService).loggedIn();
  if(status){
    return true;
  }
  else{
    window.sessionStorage.setItem('redirect', state.url);
    return inject(Router).createUrlTree(['/account/signin']);
  }
  
};
