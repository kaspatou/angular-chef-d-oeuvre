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



@Component({
  selector: 'app-liste-materiel',
  templateUrl: './liste-materiel.component.html',
  styleUrls: ['./liste-materiel.component.css']
})
export class ListeMaterielComponent implements OnInit {
  displayedColumns: string[] = ['type', 'marque', 'modele', 'os', 'statut'];
  dataSource = new MatTableDataSource<Materiel>();

  /* @ViewChild(MatPaginator) paginator: MatPaginator; */





  materielList: BehaviorSubject<Materiel[]>;
  listeCategories: BehaviorSubject<Categorie[]>;


  constructor(private materielService: MaterielService, private categorieService: CategorieService) { }

  ngOnInit() {

   /* this.dataSource.paginator = this.paginator; */
    this.materielList = this.materielService.availableMateriels$;
    this.listeCategories = this.categorieService.listeCategories$;
    this.materielService.getMateriels().subscribe(materiels => {this.dataSource= new MatTableDataSource<Materiel>(materiels);
    });


  }



}
