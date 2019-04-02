import {Materiel} from './materiel.model';
import {Utilisateur} from './utilisateur.model';

export class Pret{
  public id: number;
  public debut: Date;
  public finPrevue: Date;
  public finReelle: Date;
  public materiel: Materiel;
  public utilisateur: Utilisateur

  constructor(id: number, debut: Date, finPrevue: Date, finRelle: Date, materiel: Materiel, utilisateur: Utilisateur) {
    this.id = id;
    this.debut = debut;
    this.finPrevue = finPrevue;
    this.finReelle = finRelle;
    this.materiel = materiel;
    this.utilisateur = utilisateur;
  }

}
