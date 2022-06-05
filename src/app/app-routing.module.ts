import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin-guard';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './pages/login/login.component';
import { OrdersOverviewComponent } from './pages/orders-overview/orders-overview.component';
import { PaintsOverviewComponent } from './pages/paints-overview/paints-overview.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { RepairsOverviewComponent } from './pages/repairs-overview/repairs-overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'reparations', pathMatch: 'full'},
  { path: 'reparations', component: RepairsOverviewComponent, canActivate: [AuthGuard] },
  { path: 'commandes', component:  OrdersOverviewComponent, canActivate: [AuthGuard] },
  { path: 'peintures', component: PaintsOverviewComponent, canActivate: [AuthGuard]  },
  { path: 'parametres', component: ParametersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
