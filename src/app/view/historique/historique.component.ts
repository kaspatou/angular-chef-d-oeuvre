import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Materiel} from '../../model/materiel.model';
import {BehaviorSubject} from 'rxjs';
import {Pret} from '../../model/pret.model';
import {MaterielService} from '../../service/materiel.service';
import {PretService} from '../../service/pret.service';
import {LoginService} from '../../service/login.service';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../model/utilisateur.model';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date de début', 'date de fin', 'date restitution'];
  dataSource = new MatTableDataSource<Pret>()

  username: string;
  utilisateur: Utilisateur;
  utilisateurId: number;

  /* @ViewChild(MatPaginator) paginator: MatPaginator; */


 /* materielList: BehaviorSubject<Materiel[]>; */
  listeDesPrets: BehaviorSubject<Pret[]>;

  constructor(private  pretService: PretService, private title: Title, private utilisateurService: UtilisateurService) {

    title.setTitle('Historique des prêts');
  }

  ngOnInit() {

    const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
    this.username = decodedToken.sub;
    console.log('username', this.username);

    this.utilisateurService.getUtilisateurs().subscribe( listeUtilisateurs => {
        for (const utilisateurIteration of listeUtilisateurs) {
          if (this.username === utilisateurIteration.identifiant) {
            this.utilisateur = utilisateurIteration;
            this.utilisateurId = utilisateurIteration.id;
            console.log('utilisateur dans methode', this.utilisateur, 'id utilisateur', this.utilisateurId);
            this.listeDesPrets = this.pretService.listePrets$;
            this.pretService.getListePretsByUtilisateur(this.utilisateur.id).subscribe(prets => {
              this.dataSource = new MatTableDataSource<Pret>(prets);
            })
            console.log(this.listeDesPrets);
          }
        }
      }
    );
    /*this.dataSource.paginator = this.paginator;*/
  /*  this.materielList = this.materielService.availableMateriels$; */

    }

}
