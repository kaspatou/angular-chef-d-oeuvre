import { Component, OnInit, ViewChild } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Materiel} from '../../model/materiel.model';
import {MaterielService} from '../../service/materiel.service';
import {ListeMaterielDatasource} from './liste-materiel.datasource';
import {Categorie} from '../../model/categorie.model';
import {CategorieService} from '../../service/categorie.service';
import {Pret} from '../../model/pret.model';
import {SelectItem} from '../../common/selectitem';



@Component({
  selector: 'app-liste-materiel',
  templateUrl: './liste-materiel.component.html',
  styleUrls: ['./liste-materiel.component.css']
})
export class ListeMaterielComponent implements OnInit {
  displayedColumns: string[] = ['type', 'marque', 'modele', 'os', 'statut'];
  dataSource = new MatTableDataSource<Materiel>();

  /* @ViewChild(MatPaginator) paginator: MatPaginator; */

  materiels: Materiel[];
  cols: any[];
  types: SelectItem[]





  materielList: BehaviorSubject<Materiel[]>;
  listeCategories: BehaviorSubject<Categorie[]>;


  constructor(private materielService: MaterielService, private categorieService: CategorieService) { }

  ngOnInit() {

    this.materielService.getListeMateriels().then(materiels => this.materiels = materiels);

   /* this.dataSource.paginator = this.paginator; */
    this.materielList = this.materielService.availableMateriels$;
    this.listeCategories = this.categorieService.listeCategories$;
    this.materielService.getMateriels().subscribe(materiels => {this.dataSource= new MatTableDataSource<Materiel>(materiels);
    });

    this.types = [];
    this.types.push({label: 'Telephone', value: 'telephone'});
    this.types.push({label: 'Tablette', value: 'tablette'});
    this.types.push({label: 'PC Portable', value: 'PC portable'});
    this.types.push({label: 'Routeur', value: 'routeur'});

    this.cols = [
      {field: 'categorie', header: 'Type'},
      {field: 'marque', header: 'Marque'},
      {field: 'modele', header: 'Modèle'},
      {field: 'os', header: 'OS'},
      {field : 'verOs', header: 'Version OS'}
    ]

  }



}
