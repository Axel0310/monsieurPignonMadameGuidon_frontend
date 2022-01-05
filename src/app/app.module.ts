import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
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
import { ItemCreationDialogComponent } from './components/item-creation-dialog/item-creation-dialog.component';
import { LocalizationListComponent } from './components/localization-list/localization-list.component';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderService } from './services/order.service';
import { AuthenticationService } from './services/authentication.service';
import { PaintService } from './services/paint.service';
import { RepairService } from './services/repair.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CreateOrderComponent } from './components/forms/create-order/create-order.component';
import { CreatePaintComponent } from './components/forms/create-paint/create-paint.component';
import { CreateRepairComponent } from './components/forms/create-repair/create-repair.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { ProviderService } from './services/provider.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { ManageProvidersComponent } from './components/forms/manage-providers/manage-providers.component';
import { ManagePasswordComponent } from './components/forms/manage-password/manage-password.component';
import { ShopService } from './services/shop.service';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MobileBottomNavbarComponent } from './components/mobile-bottom-navbar/mobile-bottom-navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MobileTopNavbarComponent } from './components/mobile-top-navbar/mobile-top-navbar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ScreenSizeService } from './services/screen-size.service';

registerLocaleData(localeFr, 'fr');

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
    ItemCreationDialogComponent,
    LocalizationListComponent,
    ExpenseTableComponent,
    CreateOrderComponent,
    CreatePaintComponent,
    CreateRepairComponent,
    ManageProvidersComponent,
    ManagePasswordComponent,
    PhoneFormatPipe,
    OrderByPipe,
    MobileBottomNavbarComponent,
    MobileTopNavbarComponent,
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
    MatDatepickerModule,
    MatStepperModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    AuthenticationService,
    OrderService,
    PaintService,
    ProviderService,
    RepairService,
    ShopService,
    ScreenSizeService,
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
