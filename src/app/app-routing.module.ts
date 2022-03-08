import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NqiSearchComponent } from './nqi-search/nqi-search.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: NqiSearchComponent },
  { path: '**', pathMatch: 'full', component: NqiSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
