import {Injectable} from '@angular/core';
import {Pret} from '../model/pret.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Materiel} from '../model/materiel.model';

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

  public updatePret(pret: Pret) {
    this.httpClient.post<Pret>('http://localhost:8080/prets/modify', pret).subscribe(updatedPret => {
        this.listePrets.push(pret);
        this.listePrets$.next(this.listePrets);
      }
    );
  }

  public getListePrets(){
    console.log(this.httpClient.get<any>('http://localhost:8080/prets/getall')
    );

    return this.httpClient.get<any>('http://localhost:8080/prets/getall')
      .toPromise()
      //.then(res => <Materiel[]>res.data)
      .then(data => { return data; });

  }

  public publishPrets() {
    this.getPrets().subscribe(listeDesPrets => {
      this.listePrets = listeDesPrets;
      this.listePrets$.next(this.listePrets);
    })
  }
}
