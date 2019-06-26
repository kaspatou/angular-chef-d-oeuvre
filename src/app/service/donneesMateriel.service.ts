import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DonneesMateriel} from '../model/donneesMateriel.model';
import {MessageService} from './message.service';
import {tap} from 'rxjs/operators';
import {Pret} from '../model/pret.model';

@Injectable({
  providedIn: 'root'
})

export class DonneesMaterielService {
  private listesDonneesMateriel: DonneesMateriel[] = [];
  listeDonneesMateriel$: BehaviorSubject<DonneesMateriel[]> = new BehaviorSubject(this.listesDonneesMateriel);

  constructor(private httpClient: HttpClient, private messageService: MessageService) {

  }

  public getDonneesMateriel(): Observable<DonneesMateriel[]> {
    return this.httpClient.get<DonneesMateriel[]>('http://localhost:8080/donnees/getall');
  }

  public getListeDonnees() {
    return this.httpClient.get<any>('http://localhost:8080/donnees/getall')
      .toPromise()
      .then(data => { return data; });

  }

  public publishDonneesMateriel() {
    this.getDonneesMateriel().subscribe(listesDonneesMateriel => {
      this.listesDonneesMateriel = listesDonneesMateriel;
      this.listeDonneesMateriel$.next(this.listesDonneesMateriel);
    });
  }

  public updateDonnee(donnee) {
    return this.httpClient.put<DonneesMateriel>('http://localhost:8080/donnees/modify', donnee)
      .pipe(
        tap((_ => this.messageService.add('Les données matérielles ont bien été mises à jour', true)))
      );
  }

  public createDonnees(donnee) {
    return this.httpClient.post<DonneesMateriel>('http://localhost:8080/donnees/add', donnee)
      .pipe (
        tap((_ => this.messageService.add('Les données matérielles ont bien été enregistrées', true))));
  }

  public deleteDonnee(donneeId: number) {
    this.httpClient.delete('http://localhost:8080/donnees/delete/' + donneeId).subscribe(deletedDonnee => {
      this.messageService.add('Les données ont bien été supprimées', true);
      this.publishDonneesMateriel();
    });
  }

}
