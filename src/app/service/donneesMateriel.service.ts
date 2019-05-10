import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DonneesMateriel} from '../model/donneesMateriel.model';

@Injectable({
  providedIn: 'root'
})

export class DonneesMaterielService {
  private listesDonneesMateriel: DonneesMateriel[] = [];
  listeDonneesMateriel$: BehaviorSubject<DonneesMateriel[]> = new BehaviorSubject(this.listesDonneesMateriel);

  constructor(private httpClient: HttpClient) {

  }

  private getDonneesMateriel(): Observable<DonneesMateriel[]> {
    return this.httpClient.get<DonneesMateriel[]>('http://localhost:8080/donnees/getall');
  }

  public publishDonneesMateriel() {
    this.getDonneesMateriel().subscribe(listesDonneesMateriel => {
      this.listesDonneesMateriel = listesDonneesMateriel;
      this.listeDonneesMateriel$.next(this.listesDonneesMateriel);
    });
  }

}
