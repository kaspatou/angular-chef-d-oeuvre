import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-recherche-materiel',
  templateUrl: './recherche-materiel.component.html',
  styleUrls: ['./recherche-materiel.component.css']
})
export class RechercheMaterielComponent implements OnInit {

  choixCategorie = new FormControl();
  optionsCategorie: string[] = ['Téléphone', 'Tablette', 'Ordinateur Portable', 'Routeur'];
  selected = 'option2';

    ngOnInit() {
  }

  }
