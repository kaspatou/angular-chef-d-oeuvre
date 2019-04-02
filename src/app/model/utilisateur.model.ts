import {Role} from './role.model';

export class Utilisateur {
  public id: number;
  public adresseMail: string;
  public identifiant: string;
  public password: string;
  public role: Role;

  constructor(id: number, adresseMail: string, identifiant: string, password: string, role: Role) {
    this.id = id;
    this.adresseMail = adresseMail;
    this.identifiant = identifiant;
    this.password = password;
    this.role = role;
  }
}
