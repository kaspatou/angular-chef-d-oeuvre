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


export interface Menu {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-gestion-pret',
  templateUrl: './gestion-pret.component.html',
  styleUrls: ['./gestion-pret.component.css']
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


  constructor(private pretService: PretService, private utilisateurService: UtilisateurService, private materielService: MaterielService) {
  }

  ngOnInit() {
    this.utilisateurService.publishUtilisateurs();
    this.utilisateurService.availableUtilisateurs$.subscribe(utilisateur => this.listeUtilisateur = utilisateur);
    this.pretService.getListePrets().then(prets => {
        this.prets = prets;
        this.prets.forEach(pret => pret.utilisateurIdentifiant = pret.utilisateur.identifiant);
        console.log(this.prets);
      this.prets.forEach(pret => pret.materielModele = pret.materiels.modele);
      }
    );

     this.materielService.publishMateriels();
     this.materielService.availableMateriels$.subscribe(materiel => this.listeMateriel = materiel);
   // this.materielService.getListeMateriels().then(materiels => {
   //   this.materiels = materiels;
   //   this.materiels.forEach(materiel => materiel.materielModele = materiel.modele);
   // }
   // );



    this.cols = [

      {field: 'debut', header: 'Début du prêt'},
      {field: 'finPrevue', header: 'Fin du prêt'},
     // {field: 'finReelle', header: 'Date de restitution'},
      {field: 'utilisateurIdentifiant', header: 'Utilisateur'},
      {field: 'materielModele', header: 'Matériel'}
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

    const prets = [...this.prets];
    if (this.newPret) {
      this.pretService.createPret(pretAEnvoyer).subscribe(
        pret => {
          console.log('enregistré', pret);
        }
      )
      prets.push(this.pret); }
    else {
      this.pretService.updatePret(pretAEnvoyer).subscribe(
        pret => {
          console.log('envoyé');
        }
      )
      prets[this.prets.indexOf(this.selectedPret)] = this.pret;

    }


    this.prets = prets;
    this.pret = null;
    this.displayDialog = false;
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
