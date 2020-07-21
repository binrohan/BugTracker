import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<ProfileComponent> {
    canDeactivate(component: ProfileComponent){
        if (component.editForm.dirty) {
            console.log('dirty');
            return confirm('Are You Sure?');
        }
        return true;
    }
}
