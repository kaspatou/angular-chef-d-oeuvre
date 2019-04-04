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

  constructor(private httpClient: HttpClient) {

  }

  public getMateriels(): Observable<Materiel[]> {
    return this.httpClient.get<Materiel[]>('http://localhost:8080/materiel/getall');
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
}
