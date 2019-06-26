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
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],

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
export class HistoriqueComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date de début', 'date de fin', 'date restitution'];
  dataSource = new MatTableDataSource<Pret>()

  username: string;
  utilisateur: Utilisateur;
  utilisateurId: number;
  prets: Pret[];
  cols: any[];
  dateDebut: Date = new Date();



  /* @ViewChild(MatPaginator) paginator: MatPaginator; */


 /* materielList: BehaviorSubject<Materiel[]>; */
  listeDesPrets: BehaviorSubject<Pret[]>;

  constructor(private  pretService: PretService, private title: Title, private utilisateurService: UtilisateurService,
              private materielService: MaterielService, private route: ActivatedRoute, private router: Router) {

    title.setTitle('Historique des prêts');
  }

  ngOnInit() {

    const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
    this.username = decodedToken.sub;
    console.log('username', this.username);
    this.utilisateurService.getUtilisateurs().subscribe( listeUtilisateurs => {
      console.log("debut for");
      for (const utilisateurIteration of listeUtilisateurs) {
        console.log('entrée dans for');
          if (this.username === utilisateurIteration.identifiant) {
            this.utilisateur = utilisateurIteration;
            this.utilisateurId = utilisateurIteration.id;
            console.log('utilisateur dans methode', this.utilisateur, 'id utilisateur', this.utilisateurId);
           // this.listeDesPrets = this.pretService.listePrets$;
            this.pretService.getListePretsByUtilisateur(this.utilisateur.id).subscribe(prets => {
              this.dataSource = new MatTableDataSource<Pret>(prets);
              console.log('liste des prets1', prets);
              this.prets = prets;
              this.prets.forEach(pret => pret.materielModele = pret.materiels.modele);
              this.prets.forEach(pret => pret.materielId = pret.materiels.id);
            });

          }
        }
      }
    );
    this.cols = [
      { field: 'debut', header: 'Début du prêt' },
      { field: 'finPrevue', header: 'Fin du prêt'},
      { field: 'finReelle', header: 'Date de restitution' },
      { field: 'materielModele', header: 'Matériel' },
      { field: '', header: 'Action' }
    ];
    /*this.dataSource.paginator = this.paginator;*/
  /*  this.materielList = this.materielService.availableMateriels$; */

    }

    getMaterielName(pret) {
    alert(pret.materiel.modele);
    return pret.materiel.modele;
    }

    onRenouveller(id) {
      this.router.navigate(['/reservation/' + id]);
    }

    onSupprimer(id) {
    console.log(id);
      this.pretService.deletePret(id);
      alert('id du prêt supprimé : '+ id);
      this.onRefresh();
      }

      onRefresh() {
        const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
        this.username = decodedToken.sub;
        console.log('username', this.username);
    this.utilisateurService.getUtilisateurs().subscribe( listeUtilisateurs => {
          for (const utilisateurIteration of listeUtilisateurs) {
            if (this.username === utilisateurIteration.identifiant) {
              this.utilisateur = utilisateurIteration;
              this.utilisateurId = utilisateurIteration.id;
              console.log('utilisateur dans methode', this.utilisateur, 'id utilisateur', this.utilisateurId);
              // this.listeDesPrets = this.pretService.listePrets$;
              this.pretService.getListePretsByUtilisateur(this.utilisateur.id).subscribe(prets => {
                this.dataSource = new MatTableDataSource<Pret>(prets);
                console.log('liste des prets1', prets);
                this.prets = prets;
                this.prets.forEach(pret => pret.materielModele = pret.materiels.modele);
                this.prets.forEach(pret => pret.materielId = pret.materiels.id);
              });

            }
          }
        }
      );
      }

}
