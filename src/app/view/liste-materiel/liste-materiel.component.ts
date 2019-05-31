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
import {Title} from '@angular/platform-browser';



@Component({
  selector: 'app-liste-materiel',
  templateUrl: './liste-materiel.component.html',
  styleUrls: ['./liste-materiel.component.css'],

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
              padding-left: 0;
            }
        }
        
        /* Show priority 2 at 480px (30em x 16px) */
        @media screen and (min-width: 30em) {
            th.ui-p-2,
            td.ui-p-2 {
                display: table-cell;
              }
        }
        
        /* Show priority 3 at 640px (40em x 16px) */
        @media screen and (min-width: 40em) {
            th.ui-p-3,
            td.ui-p-3 {
                display: table-cell;
            }
        }
        
        /* Show priority 4 at 800px (50em x 16px) */
        @media screen and (min-width: 50em) {
            th.ui-p-4,
            td.ui-p-4 {
                display: table-cell;
            }
        }
        
        /* Show priority 5 at 960px (60em x 16px) */
        @media screen and (min-width: 60em) {
            th.ui-p-5,
            td.ui-p-5 {
                display: table-cell;
            }
        }
        
        /* Show priority 6 at 1,120px (70em x 16px) */
        @media screen and (min-width: 70em) {
            th.ui-p-6,
            td.ui-p-6 {
                display: table-cell;
            }
        }
    `]
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


  constructor(private materielService: MaterielService, private categorieService: CategorieService, private title: Title) {
    title.setTitle('Demande de prêt');
  }

  ngOnInit() {

    this.materielService.getListeMateriels().then(materiels => this.materiels = materiels);

   /* this.dataSource.paginator = this.paginator; */
    this.materielList = this.materielService.availableMateriels$;
    this.listeCategories = this.categorieService.listeCategories$;
    this.materielService.getMateriels().subscribe(materiels => {this.dataSource = new MatTableDataSource<Materiel>(materiels);
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
