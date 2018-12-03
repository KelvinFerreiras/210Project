import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { MainComponent } from './main/main.component';


export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'main', component: MainComponent,
    },
    {
        path: '', redirectTo: '/signup', pathMatch: 'full'
    }
];