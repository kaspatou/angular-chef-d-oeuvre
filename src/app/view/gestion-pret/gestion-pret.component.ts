import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Materiel} from '../../model/materiel.model';
import {BehaviorSubject} from 'rxjs';
import {Pret} from '../../model/pret.model';
import {MaterielService} from '../../service/materiel.service';
import {PretService} from '../../service/pret.service';
import {SelectionModel} from '@angular/cdk/collections';

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
  displayedColumns: string[] = ['id', 'date de début', 'date de fin', 'date restitution', 'select'];
  dataSource = new MatTableDataSource<Pret>()
  selection = new SelectionModel<Pret>(true, []);
  /* materielList: BehaviorSubject<Materiel[]>; */
  listeDesPrets: BehaviorSubject<Pret[]>;
  menus: Menu[] = [
    {value: 'modifier', viewValue: 'Modifier'},
    {value: 'supprimer', viewValue: 'Supprimer'},
    {value: 'aucune', viewValue: 'aucune action'}
  ];


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Pret): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }


  /* @ViewChild(MatPaginator) paginator: MatPaginator; */




  constructor(private  pretService: PretService) { }

  ngOnInit() {
    /*this.dataSource.paginator = this.paginator;*/
    /*  this.materielList = this.materielService.availableMateriels$; */
    this.listeDesPrets = this.pretService.listePrets$;
    this.pretService.getPrets().subscribe(prets => {this.dataSource = new MatTableDataSource<Pret>(prets);
    })
    console.log(this.listeDesPrets);
  }

}
