import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicCvComponent } from './public-cv/public-cv';
import { DashboardComponent } from './dashboard/dashboard';

const routes: Routes = [
  { path: '', component: PublicCvComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
