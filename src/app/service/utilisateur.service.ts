import {Injectable} from '@angular/core';
import {Utilisateur} from '../model/utilisateur.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable ({
  providedIn: 'root'
})

export class UtilisateurService {
  public availableUtilisateurs: Utilisateur[] = [];
  public availableUtilisateurs$: BehaviorSubject<Utilisateur[]> = new BehaviorSubject(this.availableUtilisateurs);

  public availableUtilisateur: Utilisateur;
  public availableUtilisateur$: BehaviorSubject<Utilisateur> = new BehaviorSubject(this.availableUtilisateur);

  constructor(private httpClient: HttpClient) { }

    private getUtilisateurs(): Observable<Utilisateur[]> {
      return this.httpClient.get<Utilisateur[]>('http://localhost:8080/utilisateur/getall');
    }


  public publishUtilisateurs() {
    this.getUtilisateurs().subscribe(listeDesUtilisateurs => {
      this.availableUtilisateurs = listeDesUtilisateurs;
      this.availableUtilisateurs$.next(this.availableUtilisateurs);
    });
  }

}
