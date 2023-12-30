import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportFilterComponent } from './sport-filter/sport-filter.component';
import { SideNavComponent } from './side-nav/side-nav.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
  { path: 'filter', component: SportFilterComponent },
  { path: 'side-nav', component: SideNavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
