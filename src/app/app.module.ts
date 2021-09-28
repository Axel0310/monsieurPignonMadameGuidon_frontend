import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RepairsOverviewComponent } from './pages/repairs-overview/repairs-overview.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PaintsOverviewComponent } from './pages/paints-overview/paints-overview.component';
import { OrdersOverviewComponent } from './pages/orders-overview/orders-overview.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverviewComponent } from './components/overview/overview.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { StatusListComponent } from './components/status-list/status-list.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { SelectClientComponent } from './components/forms/select-client/select-client.component';
import { CreateItemsComponent } from './components/forms/create-items/create-items.component';
import { LocalizationListComponent } from './components/localization-list/localization-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RepairsOverviewComponent,
    PaintsOverviewComponent,
    OrdersOverviewComponent,
    ParametersComponent,
    OverviewComponent,
    ClientInfoComponent,
    StatusListComponent,
    ItemsListComponent,
    ItemsTableComponent,
    SelectClientComponent,
    CreateItemsComponent,
    LocalizationListComponent,
    ExpenseTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
