import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { FeedComponent } from './main/feed/feed.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'main', component: MainComponent,
        children: [{ path: 'feed', component: FeedComponent }]

    },

    {
        path: '', redirectTo: '/signup', pathMatch: 'full'
    }
];