import { NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthentificationComponent} from './view/authentification/authentification.component';
import {RechercheMaterielComponent} from './view/recherche-materiel/recherche-materiel.component';
import {HistoriqueComponent} from './view/historique/historique.component';
import {ListeMaterielComponent} from './view/liste-materiel/liste-materiel.component';


const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  { path: 'accueil', component: RechercheMaterielComponent},
  { path: 'historique', component: HistoriqueComponent},
  { path: 'listing', component: ListeMaterielComponent},
  { path: 'recherche', component: RechercheMaterielComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
