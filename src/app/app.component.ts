import { Component, OnInit } from '@angular/core';
import {MaterielService} from './service/materiel.service';
import {CategorieService} from './service/categorie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionMateriel La Poste';

  constructor(private materielService: MaterielService, private categorieService: CategorieService) {}

  ngOnInit() {
    this.materielService.publishMateriels();
    this.categorieService.publishCategories();
  }
}


