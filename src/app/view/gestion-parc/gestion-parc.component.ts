import { Component, OnInit } from '@angular/core';
import {Materiel} from '../../model/materiel.model';
import {MaterielService} from '../../service/materiel.service';
import {BehaviorSubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-gestion-parc',
  templateUrl: './gestion-parc.component.html',
  styleUrls: ['./gestion-parc.component.css']
})
export class GestionParcComponent implements OnInit {

  dataSource = new MatTableDataSource<Materiel>();
  materiels: Materiel[];

  selectedMateriels: BehaviorSubject<Materiel[]>;

  cols: any[];

  constructor(private materielService: MaterielService) { }

  ngOnInit() {
   /* this.materiels = this.materielService.availableMateriels$;
    this.materielService.getMateriels().subscribe(materiels => {this.dataSource= new MatTableDataSource<Materiel>(materiels);
    }); */

    this.materielService.getListeMateriels().then(materiels => this.materiels = materiels);

    console.log(this.materiels);


    this.cols = [
      {field: 'marque', header: 'Marque'},
      {field: 'modele', header: 'Modele'},
      {field: 'os', header: 'OS'},
      {field : 'serie', header: 'Serie'}
    ]
  }

}
