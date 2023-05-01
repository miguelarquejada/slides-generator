import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ThemeComponent } from './theme/theme.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { ToastrModule } from 'ngx-toastr';
import { TippyDirective } from './tippy.directive';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    HomeComponent,
    TippyDirective,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
