import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { FeedComponent } from './main/feed/feed.component';
import { ChatComponent } from './main/chat/chat.component';
import { ProfileComponent } from './main/profile/profile.component';
import { GamesComponent } from './main/games/games.component';
import { SettingsComponent } from './main/settings/settings.component';


export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'main', component: MainComponent,
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'feed', component: FeedComponent },
            { path: 'chat', component: ChatComponent },
            { path: 'games', component: GamesComponent },
            { path: 'settings', component: SettingsComponent }
        ]

    },

    {
        path: '', redirectTo: '/signup', pathMatch: 'full'
    }
];