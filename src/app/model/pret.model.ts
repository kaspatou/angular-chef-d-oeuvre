import {Materiel} from './materiel.model';
import {Utilisateur} from './utilisateur.model';

export interface Pret {
  id?: number;
  debut?: Date;
  finPrevue?: Date;
  finReelle?: Date;
  materiels?: Materiel;
  utilisateur?: Utilisateur;
  utilisateurIdentifiant?: string;
  materielModele?: string;
  materielId?: number;

}

export class Pret {
  public id?: number;
  public debut?: Date;
  public finPrevue?: Date;
  public finReelle?: Date;
  public materiels?: Materiel;
  public utilisateur?: Utilisateur
  utilisateurIdentifiant?: string;

  constructor(id: number, debut: Date, finPrevue: Date, finRelle: Date, materiels: Materiel, utilisateur: Utilisateur) {
    this.id = id;
    this.debut = new Date(debut);
    this.finPrevue = new Date(finPrevue);
    this.finReelle = new Date(finRelle);
    this.materiels = materiels;
    this.utilisateur = utilisateur;
  }

}
