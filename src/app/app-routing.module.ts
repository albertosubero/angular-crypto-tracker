import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailsComponent } from './core/views/coin-details/coin-details.component';
import { CoinsListComponent } from './core/views/coins-list/coins-list.component';

const routes: Routes = [
  {path:'', redirectTo :'coin-list', pathMatch:'full'},
  {path:'coin-list', component: CoinsListComponent},
  {path:'coin-detail/:id', component: CoinDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
