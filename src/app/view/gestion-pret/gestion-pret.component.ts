import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Materiel} from '../../model/materiel.model';
import {BehaviorSubject} from 'rxjs';
import {Pret} from '../../model/pret.model';
import {MaterielService} from '../../service/materiel.service';
import {PretService} from '../../service/pret.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Utilisateur} from '../../model/utilisateur.model';


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

  cols: any[];


  constructor(private pretService: PretService) {
  }

  ngOnInit() {
    this.pretService.getListePrets().then(prets => {
      this.prets = prets;
      this.prets.forEach(pret => pret.utilisateurIdentifiant = pret.utilisateur.identifiant)
    }
      )


    this.cols = [

      {field: 'debut', header: 'Début du prêt'},
      {field: 'finPrevue', header: 'Fin du prêt'},
      {field: 'finReelle', header: 'Date de restitution'},
      {field: 'utilisateurIdentifiant', header: 'Utilisateur'}

    ];
  }

  showDialogToAdd() {
    this.newPret = true;
    this.pret = new PrimePret();
    this.displayDialog = true;
  }

  save() {
    const pretAEnvoyer = {
      id: this.pret.id,
      utilisateur: this.pret.utilisateur,
      finReelle: new Date(this.pret.finReelle).toJSON(),
      finPrevue: new Date(this.pret.finPrevue).toJSON(),
      materiel: this.pret.materiel,
      debut: new Date(this.pret.debut).toJSON()
    }
    let prets = [...this.prets];
    if (this.newPret)
      prets.push(this.pret);
    else {
      this.pretService.updatePret(pretAEnvoyer).subscribe(
        pret => {
          console.log('enoyé')
        }
      )
      prets[this.prets.indexOf(this.selectedPret)] = this.pret

    }


    this.prets = prets;
    this.pret = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.prets.indexOf(this.selectedPret);
    this.prets = this.prets.filter((val, i) => i != index);
    this.pret = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
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
  constructor(public id?, public debut?, public finPrevue?, public finReelle?, public materiel?, public utilisateur?) {}
}
/*
displayedColumns: string[] = ['id', 'date de début', 'date de fin', 'date restitution', 'select'];
dataSource = new MatTableDataSource<Pret>()
selection = new SelectionModel<Pret>(true, []);
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
constructor(private  pretService: PretService) { }
ngOnInit() {
  this.listeDesPrets = this.pretService.listePrets$;
  this.pretService.getPrets().subscribe(prets => {this.dataSource = new MatTableDataSource<Pret>(prets);
  })
  console.log(this.listeDesPrets);
}
*/
