import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlueThemeComponent } from './blue-theme/blue-theme.component';
import { PinkThemeComponent } from './pink-theme/pink-theme.component';
import { DarkThemeComponent } from './dark-theme/dark-theme.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blue', component: BlueThemeComponent },
  { path: 'pink', component: PinkThemeComponent },
  { path: 'dark', component: DarkThemeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
