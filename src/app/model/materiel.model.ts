import {Categorie} from './categorie.model';

export interface Materiel {
  id?: number;
  imei?: number;
  marque?: string;
  modele?: string;
  os?: string;
  serie?: string;
  verOs?: string;
  categorie?: Categorie[];


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

  constructor(id: number, imei: number, marque: string, modele: string, os: string, serie: string, verOS: string, categorie: Categorie[]) {
    this.id = id;
    this.imei = imei;
    this.marque = marque;
    this.modele = modele;
    this.os = os;
    this.serie = serie;
    this.verOs = verOS;
    this.categorie = categorie;
  }
}

