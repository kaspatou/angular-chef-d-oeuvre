import {Categorie} from './categorie.model';
import {DonneesMateriel} from './donneesMateriel.model';

export interface Materiel {
  id?: number;
  imei?: number;
  marque?: string;
  modele?: string;
  os?: string;
  serie?: string;
  verOs?: string;
  categorie?: Categorie[];
  donneesMateriel?: DonneesMateriel[];


}

export class Materiel {
  public id?: number;
  public imei?: number;
  public marque?: string;
  public modele?: string;
  public os?: string;
  public serie?: string;
  public verOs?: string;
  public categorie?: Categorie[];
  public donneesMateriel?: DonneesMateriel[];

  constructor(id: number, imei: number, marque: string, modele: string,
              os: string, serie: string, verOS: string, categorie: Categorie[],
              donneesMateriel: DonneesMateriel[]) {
    this.id = id;
    this.imei = imei;
    this.marque = marque;
    this.modele = modele;
    this.os = os;
    this.serie = serie;
    this.verOs = verOS;
    this.categorie = categorie;
    this.donneesMateriel = donneesMateriel;
  }
}

