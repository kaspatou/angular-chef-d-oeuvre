import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Materiel} from '../../model/materiel.model';
import {BehaviorSubject} from 'rxjs';
import {Pret} from '../../model/pret.model';
import {MaterielService} from '../../service/materiel.service';
import {PretService} from '../../service/pret.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Utilisateur} from '../../model/utilisateur.model';
import {Profil} from '../../model/profil.model';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Categorie} from '../../model/categorie.model';
import {DonneesMateriel} from '../../model/donneesMateriel.model';
import {Title} from '@angular/platform-browser';


export interface Menu {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-gestion-pret',
  templateUrl: './gestion-pret.component.html',
  styleUrls: ['./gestion-pret.component.css'],

  styles: [`
    /* Column Priorities */
        @media only all {
            th.ui-p-6,
            td.ui-p-6,
            th.ui-p-5,
            td.ui-p-5,
            th.ui-p-4,
            td.ui-p-4,
            th.ui-p-3,
            td.ui-p-3,
            th.ui-p-2,
            td.ui-p-2,
            th.ui-p-1,
            td.ui-p-1 {
                display: none;
            }
        }
        
        /* Show priority 1 at 320px (20em x 16px) */
        @media screen and (min-width: 20em) {
            th.ui-p-1,
            td.ui-p-1 {
                display: table-cell;
              padding-left: 0px;
            }
        }
        
        /* Show priority 2 at 480px (30em x 16px) */
        @media screen and (min-width: 30em) {
            th.ui-p-2,
            td.ui-p-2 {
                display: table-cell;
              padding-left: 0px;
              }
        }
        
        /* Show priority 3 at 640px (40em x 16px) */
        @media screen and (min-width: 40em) {
            th.ui-p-3,
            td.ui-p-3 {
                display: table-cell;
              padding-left: 0;
            }
        }
        
        /* Show priority 4 at 800px (50em x 16px) */
        @media screen and (min-width: 50em) {
            th.ui-p-4,
            td.ui-p-4 {
                display: table-cell;
              padding-left: 0;
            }
        }
        
        /* Show priority 5 at 960px (60em x 16px) */
        @media screen and (min-width: 60em) {
            th.ui-p-5,
            td.ui-p-5 {
                display: table-cell;
              padding-left: 0;
            }
        }
        
        /* Show priority 6 at 1,120px (70em x 16px) */
        @media screen and (min-width: 70em) {
            th.ui-p-6,
            td.ui-p-6 {
                display: table-cell;
              padding-left: 0;
            }
        }
    `]
})
export class GestionPretComponent implements OnInit {

  displayDialog: boolean;

  pret: Pret = new PrimePret();

  selectedPret: Pret;

  newPret: boolean;

  prets: Pret[];

  materiels: Materiel[];

  categories: Categorie[];

  donneesMateriels: DonneesMateriel[];

  cols: any[];

  enCreation: boolean;

  listeMateriel: Materiel[];

  listeUtilisateur: Utilisateur[];


  constructor(private pretService: PretService, private utilisateurService: UtilisateurService,
              private materielService: MaterielService, private title: Title) {
    title.setTitle('Gestion des prêts');
  }

  ngOnInit() {
    this.onRefresh();
    this.utilisateurService.publishUtilisateurs();
    this.utilisateurService.availableUtilisateurs$.subscribe(utilisateur => this.listeUtilisateur = utilisateur);
    this.materielService.publishMateriels();
     this.materielService.availableMateriels$.subscribe(materiel => this.listeMateriel = materiel);
   // this.materielService.getListeMateriels().then(materiels => {
   //   this.materiels = materiels;
   //   this.materiels.forEach(materiel => materiel.materielModele = materiel.modele);
   // }
   // );



    this.cols = [
      {field: 'utilisateurIdentifiant', header: 'Utilisateur'},
      {field: 'materielModele', header: 'Matériel'},
      {field: 'debut', header: 'Début du prêt'},
      {field: 'finPrevue', header: 'Fin du prêt'},
      {field: 'finReelle', header: 'Date de restitution'},

    ];
  }

  showDialogToAdd() {
    this.enCreation = true;
    this.newPret = true;
    this.pret = new PrimePret();
    this.displayDialog = true;
  }

  save() {
    // const identifiantUtilisateur = document.getElementById('utilisateur').value;
    const identifiantUtilisateur = (<HTMLInputElement>document.getElementById('utilisateur')).value;
    const modeleMateriel = (<HTMLInputElement>document.getElementById('materiel')).value;
    const pretAEnvoyer = {
      id: this.pret.id,
      debut: new Date(this.pret.debut).toJSON(),
      finReelle: new Date(this.pret.finReelle).toJSON(),
      finPrevue: new Date(this.pret.finPrevue).toJSON(),
      // materiel: this.pret.materiels,
      materiels: this.listeMateriel.find(materiels => materiels.modele === modeleMateriel),
      utilisateur: this.listeUtilisateur.find(utilisateur => utilisateur.identifiant === identifiantUtilisateur)
    }
    console.log(pretAEnvoyer);

    const prets = [...this.prets];
    if (this.newPret) {
      this.pretService.createPret(pretAEnvoyer).subscribe(
        pret => {
          console.log('enregistré', pret);
         this.onRefresh();
        }
      );
      // prets.push(this.pret);
      }
    else {
      this.pretService.updatePret(pretAEnvoyer).subscribe(
        pret => {
          console.log('envoyé', pret);
          this.onRefresh();
        }
      );
      prets[this.prets.indexOf(this.selectedPret)] = this.pret;
      }



    this.prets = prets;
    this.pret = null;
    this.displayDialog = false;
    this.onRefresh();
  }

  delete(pretId: number = this.pret.id) {
    this.pretService.deletePret(pretId);
    const index = this.prets.indexOf(this.selectedPret);
    this.prets = this.prets.filter((val, i) => i != index);
    this.pret = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.enCreation = false;
    this.newPret = false;
    this.pret = this.clonePret(event.data);
    this.displayDialog = true;
  }

  onRefresh() {
    this.pretService.getListePrets().then(prets => {
        this.prets = prets;
        this.prets.forEach(pret => pret.utilisateurIdentifiant = pret.utilisateur.identifiant);
        console.log(this.prets);
        this.prets.forEach(pret => pret.materielModele = pret.materiels.modele);
        // this.pretService.getListePrets().resolve(pret => this.prets = pret);
      }
    );
  }

  clonePret(c: Pret): Pret {
    let pret = new PrimePret();
    for (let prop in c) {
      pret[prop] = c[prop];
    }
    return pret;
  }
}

class PrimePret implements Pret {
  constructor(public id?, public debut?, public finPrevue?, public finReelle?, public materiels?, public utilisateur?) {
    this.utilisateur = new Utilisateur(null, '', '', '', new Profil(0, ''));
    this.materiels = new Materiel(0, 0, '', '', '',
      '', '', null , null
      );
  }

  //new Categorie(0,'')
  //new DonneesMateriel(0, '', '', '', '', 0, '')
}
