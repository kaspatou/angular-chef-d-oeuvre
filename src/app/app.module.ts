import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatTableModule,
  MatInputModule, MatPaginatorModule, MatSidenavModule, MatNativeDateModule, MatSelectModule, MatCheckboxModule, MatTooltipModule
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HeaderComponent } from './view/header/header.component';
import { FooterComponent } from './view/footer/footer.component';
import { AuthentificationComponent } from './view/authentification/authentification.component';
import { RechercheMaterielComponent } from './view/recherche-materiel/recherche-materiel.component';
import {AppRoutingModule} from './app-routing.module';
import { HistoriqueComponent } from './view/historique/historique.component';
import { ListeMaterielComponent } from './view/liste-materiel/liste-materiel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReservationComponent } from './view/reservation/reservation.component';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {CalendarModule, CardModule, DataTableModule} from 'primeng/primeng';
import {JwtInterceptor} from './http-interceptor/jwt.interceptor';
import {ReaderGuard} from './guards/reader.guard';
import {CreatorGuard} from './guards/creator.guard';
import {AdminGuard} from './guards/admin.guard';
import { GestionParcComponent } from './view/gestion-parc/gestion-parc.component';
import { GestionPretComponent } from './view/gestion-pret/gestion-pret.component';
import {TableModule} from 'primeng/table';
import { DialogModule, Dialog } from 'primeng/primeng';
import {InputMaskModule} from 'primeng/inputmask';
import {ListboxModule} from 'primeng/listbox';
import {DropdownModule} from 'primeng/dropdown';
import { MessageComponent } from './message/message.component';
import {DonneesMaterielComponent} from './view/donnees-materiel/donnees-materiel.component';









@NgModule({

    declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthentificationComponent,
    RechercheMaterielComponent,
    HistoriqueComponent,
    ListeMaterielComponent,
    ReservationComponent,
    GestionParcComponent,
    GestionPretComponent,
    MessageComponent,
    DonneesMaterielComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FullCalendarModule,
    CalendarModule,
    MatCheckboxModule,
    TableModule,
    DialogModule,
    InputMaskModule,
    DataTableModule,
    CardModule,
    MatTooltipModule,
    ListboxModule,
    DropdownModule
  ],
  providers: [ReaderGuard, CreatorGuard, AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
