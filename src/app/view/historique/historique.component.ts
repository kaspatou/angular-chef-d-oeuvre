import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Materiel} from '../../model/materiel.model';
import {BehaviorSubject} from 'rxjs';
import {Pret} from '../../model/pret.model';
import {MaterielService} from '../../service/materiel.service';
import {PretService} from '../../service/pret.service';
import {LoginService} from '../../service/login.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date de début', 'date de fin', 'date restitution'];
  dataSource = new MatTableDataSource<Pret>()

  /* @ViewChild(MatPaginator) paginator: MatPaginator; */


 /* materielList: BehaviorSubject<Materiel[]>; */
  listeDesPrets: BehaviorSubject<Pret[]>;

  constructor(private  pretService: PretService, private title: Title) {

    title.setTitle('Historique des prêts');
  }

  ngOnInit() {
    /*this.dataSource.paginator = this.paginator;*/
  /*  this.materielList = this.materielService.availableMateriels$; */
    this.listeDesPrets = this.pretService.listePrets$;
    this.pretService.getPrets().subscribe(prets => {this.dataSource = new MatTableDataSource<Pret>(prets);
    })
    console.log(this.listeDesPrets);
    }

}
