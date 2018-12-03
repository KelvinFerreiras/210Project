import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";

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
    MakepostComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [  AppComponent,
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
    MakepostComponent]
})
export class AppModule { }
