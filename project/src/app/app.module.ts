import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

import { appRoutes } from "./routes";
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { FeedComponent } from './main/feed/feed.component';
import { PostsComponent } from './main/feed/posts/posts.component';
import { ChatComponent } from './main/chat/chat.component';
import { ProfileComponent } from './main/profile/profile.component';
import { GamesComponent } from './main/games/games.component';
import { SettingsComponent } from './main/settings/settings.component';
import { MakepostComponent } from './main/feed/posts/makepost/makepost.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { PongGameComponent } from './main/games/pong/pong.component'


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    MainComponent,
    SidebarComponent,
    FeedComponent,
    PostsComponent,
    ChatComponent,
    ProfileComponent,
    GamesComponent,
    SettingsComponent,
    MakepostComponent,
    SignInComponent,
    PongGameComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [UserService, AuthGuardService],
  bootstrap: [  AppComponent/*,
    UserComponent,
    SignUpComponent,a
    MainComponent,
    SidebarComponent,
    FeedComponent,
    PostsComponent,
    ChatComponent,
    ProfileComponent,
    GamesComponent,
    SettingsComponent,
  MakepostComponent*/]
})
export class AppModule { }
