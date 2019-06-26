import { Component, OnInit } from '@angular/core';
import {Materiel} from '../../model/materiel.model';
import {MaterielService} from '../../service/materiel.service';
import {BehaviorSubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {Categorie} from '../../model/categorie.model';
import {Pret} from '../../model/pret.model';
import {CategorieService} from '../../service/categorie.service';
import {DonneesMateriel} from '../../model/donneesMateriel.model';
import {DonneesMaterielService} from '../../service/donneesMateriel.service';
import {Title} from '@angular/platform-browser';

export interface Menu {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gestion-parc',
  templateUrl: './gestion-parc.component.html',
  styleUrls: ['./gestion-parc.component.css']
})
export class GestionParcComponent implements OnInit {
 // displayedColumns: string[] = ['type', 'marque', 'modele', 'os', 'statut'];
 // dataSource = new MatTableDataSource<Materiel>();

  displayDialog: boolean;

  materiel: Materiel = new PrimeMateriel();

  materiels:  Materiel[] ;

  selectedMateriels: Materiel[];
  selectedMateriel: Materiel;
  newMateriel: boolean;
  cols: any[];
  enCreation: boolean;
  listeCategorie: Categorie[];
  listeDonnees: DonneesMateriel[];
  listeMateriel: Materiel[];
  // ajout pour choix deroulant
  choixCompte: DonneesMateriel[];
  compteChoisi: DonneesMateriel;


  constructor(private materielService: MaterielService, private categorieService: CategorieService,
              private donneesMaterielService: DonneesMaterielService, private title: Title) {
    title.setTitle('gestion du parc');

  }



  ngOnInit() {
    /* this.materiels = this.materielService.availableMateriels$;
    this.materielService.getMateriels().subscribe(materiels => {this.dataSource= new MatTableDataSource<Materiel>(materiels);
    }); */

    this.donneesMaterielService.publishDonneesMateriel();
    this.donneesMaterielService.listeDonneesMateriel$.subscribe((donnees) => {
      this.listeDonnees = donnees;
      this.choixCompte = donnees;
    });
    // this.donneesMaterielService.listeDonneesMateriel$.subscribe(listeDonnees => this.choixCompte = listeDonnees);
    this.categorieService.publishCategories();
    this.categorieService.listeCategories$.subscribe(categorie => this.listeCategorie = categorie);
    // this.materielService.publishMateriels();
    // this.materielService.availableMateriels$.subscribe(materiel => this.listeMateriel = materiel);
    this.materielService.getListeMateriels().then(materiels =>
    this.materiels = materiels
    );


    this.cols = [
      {field: 'marque', header: 'Marque'},
      {field: 'modele', header: 'Modèle'},
      {field: 'os', header: 'OS'},
      {field : 'verOs', header: 'Version OS'}
    ];
  }

  showDialogToAdd() {
    this.enCreation = true;
    this.newMateriel = true;
    this.materiel = new PrimeMateriel();
    this.displayDialog = true;
  }

  save() {
    const nomCategorie = (<HTMLInputElement>document.getElementById('categorie')).value;
    const idDonnees = (<HTMLInputElement>document.getElementById('donneesMateriel')).value;
    const materielAEnvoyer = {
      id: this.materiel.id,
      marque: this.materiel.marque,
      modele: this.materiel.modele,
      imei: this.materiel.imei,
      serie: this.materiel.serie,
      os: this.materiel.os,
      verOs: this.materiel.verOs,
      categorie: this.listeCategorie.find(categorie => categorie.nom === nomCategorie),
      donneesMateriel: this.listeDonnees.find(donnees => donnees.compteUtilisateur === idDonnees)

    }

    const materiels = [...this.materiels];
    console.log(materielAEnvoyer);
    if (this.newMateriel) {
      this.materielService.createMateriel(materielAEnvoyer).subscribe(
        materiel => {
          console.log('enregistré', materiel);
          this.onRefresh();
        }
      )
      materiels.push(this.materiel);
    } else {
      this.materielService.updateMateriel(materielAEnvoyer).subscribe(
        materiel => {
          console.log('envoyé', materiel);
          this.onRefresh();
        }
      );
      materiels[this.materiels.indexOf(this.selectedMateriel)] = this.materiel;

    }


    this.materiels = materiels;
    this.materiel = null;
    this.displayDialog = false;
  }


  delete(materielId: number = this.materiel.id) {
    this.materielService.deleteMateriel(materielId);
    const index = this.materiels.indexOf(this.selectedMateriel);
    this.materiels = this.materiels.filter((val, i) => i != index);
    this.materiel = null;
    this.displayDialog = false;
  }

  onRefresh() {
    this.materielService.getListeMateriels().then(materiels =>
      this.materiels = materiels
    );
  }

  onRowSelect(event) {
    this.enCreation = false;
    this.newMateriel = false;
    this.materiel = this.cloneMateriel(event.data);
    this.displayDialog = true;
  }

  cloneMateriel(c: Materiel): Materiel {
    let materiel = new PrimeMateriel();
    for (let prop in c) {
      materiel[prop] = c[prop];
    }
    return materiel;
  }

}

class PrimeMateriel implements Materiel {
  constructor(public id?, public imei?, public marque?, public modele?, public os?, public serie?, public verOs?, public categorie?, public donneesMateriel?) {
    this.categorie = new Categorie(0, null);
    this.donneesMateriel = new DonneesMateriel(0, '', '', '', '', 0, '');
  }
}
