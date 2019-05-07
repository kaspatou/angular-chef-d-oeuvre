import {Materiel} from './materiel.model';
import {Utilisateur} from './utilisateur.model';

export interface Pret {
  id?: number;
  debut?: Date;
  finPrevue?: Date;
  finReelle?: Date;
  materiel?: Materiel;
  utilisateur?: Utilisateur;
  utilisateurIdentifiant?: string;

}

export class Pret{
  public id?: number;
  public debut?: Date;
  public finPrevue?: Date;
  public finReelle?: Date;
  public materiel?: Materiel;
  public utilisateur?: Utilisateur
  utilisateurIdentifiant?: string;

  constructor(id: number, debut: Date, finPrevue: Date, finRelle: Date, materiel: Materiel, utilisateur: Utilisateur) {
    this.id = id;
    this.debut = new Date(debut);
    this.finPrevue = new Date(finPrevue);
    this.finReelle = new Date(finRelle);
    this.materiel = materiel;
    this.utilisateur = utilisateur;
  }

}
