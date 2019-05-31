import { Component, OnInit } from '@angular/core';
import {MaterielService} from './service/materiel.service';
import {CategorieService} from './service/categorie.service';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isReader: boolean;
  isCreator: boolean;
  isAdmin: boolean;
  title = 'gestionMateriel La Poste';

  constructor(private materielService: MaterielService, private categorieService: CategorieService,
              private loginService: LoginService) {}

  ngOnInit() {
    this.materielService.publishMateriels();
    this.categorieService.publishCategories();
    this.loginService.userRoles.subscribe(userRoles => {
      this.isReader = userRoles.includes('ROLE_READER');
      this.isCreator = userRoles.includes('ROLE_CREATOR');
      this.isAdmin = userRoles.includes('ROLE_ADMIN');
    });
  }
}


