import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Interface for components that can be deactivated.
 * Components implementing this interface can define custom logic to determine
 * if they can be deactivated (e.g., to prevent losing unsaved changes).
 */
export interface CanComponentDeactivate {
   canDeactivate(): Observable<boolean> | boolean;
}

/**
 * Service for handling component deactivation.
 * This service is used by the CanDeactivate route guard to determine if a component
 * can be deactivated.
 */
@Injectable({
   providedIn: 'root',
})
export class CanDeactivateGuardService {
   /**
    * Checks if a component can be deactivated.
    * @param component The component to check.
    * @returns True if the component can be deactivated, false otherwise.
    */
   public canDeactivate(component: CanComponentDeactivate): boolean | Observable<boolean> {
      return component.canDeactivate ? component.canDeactivate() : true;
   }
}
