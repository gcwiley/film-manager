import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Portal } from '../types/portal.type';

// the breadscrubmsPortalService is an injectable service resposible for managing the current state of a portal, in this case the breadcrumbs.
@Injectable({
   providedIn: 'root',
})
export class BreadcrumbsPortalService {
   // subject the emits the currently active portal
   private activePortal = new Subject<Portal>();

   // Observable that emits the active portal
   public readonly portal$ = this.activePortal.asObservable();

   public setPortal(portal: Portal): void {
      // emits the next value for the active portal
      this.activePortal.next(portal);
   }
}
