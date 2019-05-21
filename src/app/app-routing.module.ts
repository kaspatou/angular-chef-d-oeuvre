import { NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthentificationComponent} from './view/authentification/authentification.component';
import {RechercheMaterielComponent} from './view/recherche-materiel/recherche-materiel.component';
import {HistoriqueComponent} from './view/historique/historique.component';
import {ListeMaterielComponent} from './view/liste-materiel/liste-materiel.component';
import {ReservationComponent} from './view/reservation/reservation.component';
import {AdminGuard} from './guards/admin.guard';
import {ReaderGuard} from './guards/reader.guard';
import {CreatorGuard} from './guards/creator.guard';
import {GestionPretComponent} from './view/gestion-pret/gestion-pret.component';
import {GestionParcComponent} from './view/gestion-parc/gestion-parc.component';



const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  { path: 'accueil', component: RechercheMaterielComponent, canActivate: [ReaderGuard]},
  { path: 'historique', component: HistoriqueComponent, canActivate: [ReaderGuard]},
  { path: 'listing', component: ListeMaterielComponent, canActivate: [ReaderGuard]},
  { path: 'recherche', component: RechercheMaterielComponent, canActivate: [ReaderGuard]},
  { path: 'reservation/:id', component: ReservationComponent, canActivate: [ReaderGuard]},
  { path: 'gestionpret', component: GestionPretComponent, canActivate: [AdminGuard]},
  { path: 'gestionparc', component: GestionParcComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
