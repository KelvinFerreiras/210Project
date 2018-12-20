import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { MainComponent } from './main/main.component';
import { FeedComponent } from './main/feed/feed.component';
import { ChatComponent } from './main/chat/chat.component';
import { ProfileComponent } from './main/profile/profile.component';

import { AuthGuard } from "./auth/auth.guard";


export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'main', component: MainComponent, canActivate: [AuthGuard], 
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'feed', component: FeedComponent},
            { path: 'chat', component: ChatComponent }
        ]

    },
    {
        path: '', redirectTo: '/main/feed', pathMatch: 'full'
    }
];