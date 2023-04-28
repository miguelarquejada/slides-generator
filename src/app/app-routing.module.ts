import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'theme/:theme', component: ThemeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
