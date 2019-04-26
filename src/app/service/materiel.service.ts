import {Injectable} from '@angular/core';
import {Materiel} from '../model/materiel.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable ({
  providedIn: 'root'
})

export class MaterielService {

  public availableMateriels: Materiel[] = [];
  availableMateriels$: BehaviorSubject<Materiel[]> = new BehaviorSubject(this.availableMateriels);

  public availableMateriel: Materiel;
  availableMateriel$: BehaviorSubject<Materiel> = new BehaviorSubject(this.availableMateriel);

  constructor(private httpClient: HttpClient) {

  }

  public getMateriels(): Observable<Materiel[]> {
    return this.httpClient.get<Materiel[]>('http://localhost:8080/materiel/getall');
  }

  public getListeMateriels() {
    return this.httpClient.get<any>('http://localhost:8080/materiel/getall')
      .toPromise()
      .then(res => <Materiel[]>res.data)
      .then(data => { return data; });
  }

  public publishMateriels() {
    this.getMateriels().subscribe(materielList => {
      this.availableMateriels = materielList;
      this.availableMateriels$.next(this.availableMateriels);
    });
  }

  public findMateriel(materielId: number): Observable<Materiel> {
    return this.httpClient.get<Materiel>('http://localhost:8080/materiel/getbyid/:id');
  }

/*
  public publishMateriel(materielId: number) {
    this.findMateriel(materielId).subscribe(detailMateriel => {
      this.availableMateriel = detailMateriel;
      this.availableMateriel$.next(this.availableMateriel);
    });
  }

  */
}
