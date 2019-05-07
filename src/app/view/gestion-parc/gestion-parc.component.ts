import { Component, OnInit } from '@angular/core';
import {Materiel} from '../../model/materiel.model';
import {MaterielService} from '../../service/materiel.service';
import {BehaviorSubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {Categorie} from '../../model/categorie.model';

@Component({
  selector: 'app-gestion-parc',
  templateUrl: './gestion-parc.component.html',
  styleUrls: ['./gestion-parc.component.css']
})
export class GestionParcComponent implements OnInit {
 // displayedColumns: string[] = ['type', 'marque', 'modele', 'os', 'statut'];
 // dataSource = new MatTableDataSource<Materiel>();

  materiels:  Materiel[] ;

  selectedMateriels: Materiel[];
  selectedMateriel: Materiel[];
  cols: any[];


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
    ]
  }

}
