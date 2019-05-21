import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Materiel} from '../../model/materiel.model';
import {BehaviorSubject} from 'rxjs';
import {Categorie} from '../../model/categorie.model';
import {MaterielService} from '../../service/materiel.service';
import {CategorieService} from '../../service/categorie.service';
import {PretService} from '../../service/pret.service';
import {ActivatedRoute, Router} from '@angular/router';
import frLocale from '@fullcalendar/core/locales/fr';
import { Calendar } from '@fullcalendar/core';
import {Pret} from '../../model/pret.model';
import {EventService} from '../../service/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {environment} from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../model/utilisateur.model';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {



  materielSelected: Materiel;
  materielId: number;
  options: any;
  events: any[];
  header: any;
  footer: any;
  dateDebut: string;
  dateFin: string;
  dataSource = new MatTableDataSource<Materiel>();
  infoDate: any;
  username: string;
  utilisateur: Utilisateur;

  materielList: BehaviorSubject<Materiel[]>;
  listeCategories: BehaviorSubject<Categorie[]>;
  listeUtilisateurs: BehaviorSubject<Utilisateur[]>;

  constructor(private route: ActivatedRoute, private materielService: MaterielService,
              private categorieService: CategorieService, private redirection: Router,
              private pretService: PretService, private eventService: EventService,
              private utilisateurService: UtilisateurService,
              private router: Router) { }

  ngOnInit() {
    this.materielId = this.route.snapshot.params.id;
    const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
    this.username = decodedToken.sub;
    console.log('username', this.username);

    this.utilisateurService.getUtilisateurs().subscribe( listeUtilisateurs => {
        for (const utilisateurIteration of listeUtilisateurs) {
          if (this.username === utilisateurIteration.identifiant) {
            this.utilisateur = utilisateurIteration;
            console.log('utilisateur dans methode', this.utilisateur);
          }
        }
    }
    );
    console.log('utilisateur sortie methode', this.utilisateur);
    this.materielService.getMateriels().subscribe( listeMateriels => {
      for (const materielIteration of listeMateriels) {
        if (+this.materielId === materielIteration.id) {
          this.materielSelected = materielIteration;
          console.log('materiel selectionné', this.materielSelected);
        }
      }
    })



    this.materielId = +this.route.snapshot.params.id;
    this.eventService.getEvents(this.materielId).then(events => {this.events = events; });

   // this.materielId = this.route.snapshot.params.id;
   // for (const materielIteration of this.materielService.availableMateriels) {
   //   if (+this.materielId === materielIteration.id) {
   //    this.materielSelected = materielIteration;
  //    }
   // }
    // console.log(this.materielSelected);
    this.materielList = this.materielService.availableMateriels$;
    this.listeCategories = this.categorieService.listeCategories$;
    this.materielService.getMateriels().subscribe(materiels => {this.dataSource = new MatTableDataSource<Materiel>(materiels);
    });
    this.utilisateurService.getUtilisateurs().subscribe(utilisateurs => {this.dataSource =
      new MatTableDataSource<Utilisateur>(utilisateurs);
    });
    this.listeUtilisateurs = this.utilisateurService.availableUtilisateurs$;

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      selectable: true,
      selectOverlap: false,
      weekends: false,
      defaultDate: new Date(),
      locale: frLocale,
      header: {

        left:   'prev, next',
        center: 'today',
        right:  'title'
      },
      customButtons: {
        custom1: {
          text: 'Enregistrer',
          click: (function() {
            this.save();
            alert('clicked custom button 1!');
          }).bind(this)
        },
        custom2: {
          text: 'custom 2',
          click: function() {
            alert('clicked custom button 2!');
          }
        }
      },
      footer: {
        left: 'prev, next',
        right: 'custom1',
        },
      // select: function(info) {
      //
      //   this.dateDebut = info.start;
      //   this.dateFin = info.end;
      //   alert('selected ' + info.start + ' to ' + info.end);
      //   console.log(this.dateDebut, this.dateFin);
      //
      // },
      select : (function(info) {
        this.setDate(info);
      }).bind(this),


      editable: true
    };

  }

  setDate(info) {
    this.dateDebut = info.startStr;
    this.dateFin = info.endStr;
    alert('date de départ du prêt ' + info.start + ' date de fin du prêt : ' + info.end);
    console.log(this.dateDebut, this.dateFin);
  }

  save() {


    const pretAEnvoyer = {

      debut: new Date(this.dateDebut).toJSON(),
      finReelle: new Date(this.dateFin).toJSON(),
      finPrevue: new Date(this.dateFin).toJSON(),
      materiels: this.materielSelected,
      utilisateur: this.utilisateur
    };
    console.log('pret à envoyer :', pretAEnvoyer);
    this.pretService.createPret(pretAEnvoyer).subscribe(
      pret => {
        console.log('enregistré', pret);
      }
    );
    console.log('yooooo', this.options);
    this.router.navigate(['listing']);
  }
}
