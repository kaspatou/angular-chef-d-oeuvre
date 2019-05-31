import {Injectable} from '@angular/core';
import {Materiel} from '../model/materiel.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable ({
  providedIn: 'root'
})

export class MaterielService {

  public availableMateriels: Materiel[] = [];
  availableMateriels$: BehaviorSubject<Materiel[]> = new BehaviorSubject(this.availableMateriels);

  public availableMateriel: Materiel;
  availableMateriel$: BehaviorSubject<Materiel> = new BehaviorSubject(this.availableMateriel);

  constructor(private httpClient: HttpClient, private messageService: MessageService) {

  }

  public getMateriels(): Observable<Materiel[]> {
    return this.httpClient.get<Materiel[]>('http://localhost:8080/materiel/getall');
  }

  public getListeMateriels(){
    console.log(this.httpClient.get<any>('http://localhost:8080/materiel/getall')
      );

    return this.httpClient.get<any>('http://localhost:8080/materiel/getall')
      .toPromise()
      // .then(res => <Materiel[]>res.data)
      .then(data => { return data; });

  }

  public updateMateriel(materiel) {
    return this.httpClient.put<Materiel>('http://localhost:8080/materiel/modify', materiel)
      .pipe(
      tap((_ => this.messageService.add('Le matériel a bien été mis à jour', true)))
    );;

  }

  public createMateriel(materiel) {
    return this.httpClient.post<Materiel>('http://localhost:8080/materiel/add', materiel).pipe(
      tap((_ => this.messageService.add('Le matériel a bien été ajouté', true)))
    );;
  }

  public deleteMateriel(materielId: number) {
    this.httpClient.delete('http://localhost:8080/materiel/delete/' + materielId).subscribe(deletedMateriel => {
      this.messageService.add('Le matériel a bien été supprimé', true);
      this.publishMateriels();
    });
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
