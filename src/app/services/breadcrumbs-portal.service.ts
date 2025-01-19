import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Portal } from '../types/portal.type';

/**
 * The BreadcrumbsPortalService is an injectable service responsible for managing
 * the current state of a portal, in this case the breadcrumbs.
 */
@Injectable({
   providedIn: 'root',
})
export class BreadcrumbsPortalService {
   /**
    * Subject that emits the currently active portal
    */
   private activePortal = new Subject<Portal>();

   /**
    * Observable that emits the active portal
    */
   public readonly portal$ = this.activePortal.asObservable();

   /**
    * Method to set the currently active portal
    * @param portal - Portal to set
    */
   public setPortal(portal: Portal): void {
      /**
       * Emits the next value for the active portal
       */
      this.activePortal.next(portal);
   }
}

