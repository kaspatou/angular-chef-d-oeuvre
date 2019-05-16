import {Profil} from './profil.model';

export interface Utilisateur {
  id: number;
  adresseMail: string;
  identifiant: string;
  password: string;
  profil: Profil;

}

export class Utilisateur {
  public id: number;
  public adresseMail: string;
  public identifiant: string;
  public password: string;
  public profil: Profil;

  constructor(id: number, adresseMail: string, identifiant: string, password: string, profil: Profil) {
    this.id = id;
    this.adresseMail = adresseMail;
    this.identifiant = identifiant;
    this.password = password;
    this.profil = profil;
  }
}
