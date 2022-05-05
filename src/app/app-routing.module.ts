import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin-guard';
import { AuthGuard } from './guards/auth-guard';
import { IsLoggedInGuard } from './guards/isLoggedIn-guard';
import { LoginComponent } from './pages/login/login.component';
import { OrdersOverviewComponent } from './pages/orders-overview/orders-overview.component';
import { PaintsOverviewComponent } from './pages/paints-overview/paints-overview.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { RepairsOverviewComponent } from './pages/repairs-overview/repairs-overview.component';

const routes: Routes = [
  { path: '', component: RepairsOverviewComponent, canActivate: [AuthGuard] },
  { path: 'repairs-overview', component: RepairsOverviewComponent, canActivate: [AuthGuard] },
  { path: 'orders-overview', component:  OrdersOverviewComponent, canActivate: [AuthGuard] },
  { path: 'paints-overview', component: PaintsOverviewComponent, canActivate: [AuthGuard]  },
  { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
