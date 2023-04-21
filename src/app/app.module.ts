import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BlueThemeComponent } from './blue-theme/blue-theme.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PinkThemeComponent } from './pink-theme/pink-theme.component';
import { DarkThemeComponent } from './dark-theme/dark-theme.component';

@NgModule({
  declarations: [
    AppComponent,
    BlueThemeComponent,
    PinkThemeComponent,
    DarkThemeComponent,
    HomeComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
