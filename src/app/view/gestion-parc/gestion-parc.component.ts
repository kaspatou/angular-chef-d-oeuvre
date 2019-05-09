import { Component, OnInit } from '@angular/core';
import {Materiel} from '../../model/materiel.model';
import {MaterielService} from '../../service/materiel.service';
import {BehaviorSubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {Categorie} from '../../model/categorie.model';
import {Pret} from '../../model/pret.model';

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
  selectedMateriel: Materiel[];
  newMateriel: boolean;
  cols: any[];
  enCreation: boolean;


  constructor(private materielService: MaterielService) { }

  ngOnInit() {
    /* this.materiels = this.materielService.availableMateriels$;
    this.materielService.getMateriels().subscribe(materiels => {this.dataSource= new MatTableDataSource<Materiel>(materiels);
    }); */

    this.materielService.getListeMateriels().then(materiels =>
    this.materiels = materiels
    );

    this.cols = [
      {field: 'marque', header: 'Marque'},
      {field: 'modele', header: 'Modèle'},
      {field: 'os', header: 'OS'},
      {field : 'serie', header: 'N° de Série'}
    ];
  }

  showDialogToAdd() {
    this.enCreation = true;
    this.newMateriel = true;
    this.materiel = new PrimeMateriel();
    this.displayDialog = true;
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
  constructor(public id?, public imei?, public marque?, public modele?, public os?, public serie?, public verOs?, public categorie?) {}
}
