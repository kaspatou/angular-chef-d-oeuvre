import {Injectable} from '@angular/core';
import {Pret} from '../model/pret.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PretService {
  private listePrets: Pret[] = [];
  listePrets$: BehaviorSubject<Pret[]> = new BehaviorSubject(this.listePrets);

  constructor (private httpClient: HttpClient) {

  }

  public getPrets(): Observable<Pret[]> {
    return this.httpClient.get<Pret[]>('http://localhost:8080/prets/getall');
  }

  public publishPrets() {
    this.getPrets().subscribe(listeDesPrets => {
      this.listePrets = listeDesPrets;
      this.listePrets$.next(this.listePrets);
    })
  }
}
