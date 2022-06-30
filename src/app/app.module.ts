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
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderService } from './services/order.service';
import { AuthenticationService } from './services/authentication.service';
import { PaintService } from './services/paint.service';
import { RepairService } from './services/repair.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { ProviderService } from './services/provider.service';
import { ExpenseService } from './services/expense.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { ManageProvidersComponent } from './components/forms/manage-providers/manage-providers.component';
import { ManageExpensesComponent } from './components/forms/manage-expenses/manage-expenses.component';
import { ManagePasswordComponent } from './components/forms/manage-password/manage-password.component';
import { ManageClientsComponent } from './components/forms/manage-clients/manage-clients.component';
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
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './components/notification/notification.component';
import { CreateItemComponent } from './components/forms/create-item/create-item.component';
import {MatSelectModule} from '@angular/material/select';
import { AdminValidationDialogComponent } from './components/admin-validation-dialog/admin-validation-dialog.component';
import { LoaderComponent } from './components/loader/loader.component'

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
    SelectClientComponent,
    ItemCreationDialogComponent,
    LocalizationListComponent,
    ExpenseTableComponent,
    ManageProvidersComponent,
    ManagePasswordComponent,
    ManageClientsComponent,
    PhoneFormatPipe,
    OrderByPipe,
    MobileBottomNavbarComponent,
    MobileTopNavbarComponent,
    ItemDetailsComponent,
    ItemsTableComponent,
    NotificationComponent,
    CreateItemComponent,
    ManageExpensesComponent,
    AdminValidationDialogComponent,
    LoaderComponent
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
    MatExpansionModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    AuthenticationService,
    NotificationService,
    OrderService,
    PaintService,
    ProviderService,
    ExpenseService,
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
