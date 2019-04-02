import {Injectable} from '@angular/core';
import {Categorie} from '../model/categorie.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategorieService {

  private listeCategories: Categorie[] = [];
  listeCategories$: BehaviorSubject<Categorie[]> = new BehaviorSubject(this.listeCategories);

  constructor(private httpClient: HttpClient) {

  }

  private getCategorie(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>('http://localhost:8080/categorie/getall');
  }

  public publishCategories() {
    this.getCategorie().subscribe(listeDesCategories => {
      this.listeCategories = listeDesCategories;
      this.listeCategories$.next(this.listeCategories);
    })
  }

  private getNomCategorie() {
    return this.httpClient.get<Categorie>('http://localhost:8080/categorie/getbyid/{id}');
  }


}
