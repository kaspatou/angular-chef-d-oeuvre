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


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

//let calendar = new Calendar(calendarEl, {
//  locale: frLocale
// });

export class ReservationComponent implements OnInit {



  materielSelected: Materiel;
  materielId: number;
  options: any;
  events: any[];
  fr: any;
  dates: Date[];

  rangeDates: Date[];

  minDate: Date;

  maxDate: Date;
  date11: Date;
  invalidDates: Array<Date>;

  displayedColumns: string[] = ['type', 'marque', 'modele', 'os', 'version os'];
  dataSource = new MatTableDataSource<Materiel>();

  materielList: BehaviorSubject<Materiel[]>;
  listeCategories: BehaviorSubject<Categorie[]>;

  constructor(private route: ActivatedRoute, private materielService: MaterielService, private categorieService: CategorieService, private redirection: Router, private pretService: PretService) { }

  ngOnInit() {/*
    this.fr = {

      firstDayOfWeek: 0,
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
      monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Déc"],
      today: "Aujourd'hui",
      clear: "désélectionner",
      dateFormat: 'jj/mm/aa'
    }; */
    this.pretService.getListePrets().then(events => {this.events = events; });
    console.log(this.events);
    this.materielId = this.route.snapshot.params.id;
    for (const materielIteration of this.materielService.availableMateriels) {
      if (+this.materielId === materielIteration.id) {
        this.materielSelected = materielIteration;
      }
    }
    console.log(this.materielSelected);
    this.materielList = this.materielService.availableMateriels$;
    this.listeCategories = this.categorieService.listeCategories$;
    this.materielService.getMateriels().subscribe(materiels => {this.dataSource= new MatTableDataSource<Materiel>(materiels);
    });

    this.options = {
      plugins: [ 'interaction' ],
      selectable: true,
      defaultDate: new Date(),
      locale: frLocale,
      header: {
        left: 'prev,next',
        center: 'title',

      },
      editable: true
      };

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.getDay();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
     invalidDate.setDate(today.getDate() - 1);

     console.log(today.getDate(), today.getFullYear());



    this.invalidDates = [ ];
     let deb = 3;
     let fin = 20;
     
     for (; deb < fin; deb++) {
      const autreDate = new Date();
      autreDate.setDate(deb);
       this.invalidDates.push(autreDate);
       console.log(autreDate.getDate(), autreDate.getFullYear());
    }
     




   // this.invalidDates = [today, invalidDate, autreDate];

    }

  }


