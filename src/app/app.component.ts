import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import sdk from '@gooddata/gooddata-js';
import { MenuItem } from './app-toolbar/app-toolbar.component';
import { projectId } from '../utils/fixtures';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent {
    isLogged: boolean;
    mainMenuItems;
    activeMenuItem$: Observable<MenuItem>;
    constructor(
        private router: Router,
    ) {
        sdk.user.isLoggedInProject(`${projectId}`).then((isOk) => {
            if (isOk) {
                this.isLogged = true;
            }
        });
    }
    logout() {
        sdk.user.logout();
        this.router.navigate(['/login']);
        this.isLogged = false;
    }
}
