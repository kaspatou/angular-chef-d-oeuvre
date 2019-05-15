

export interface Categorie {
  id?: number;
  nom?: string;
}
export class Categorie {

  public id?: number;
  public nom?: string;

  constructor(id: number, nom: string) {
    this.id = id;
    this.nom = nom;
  }
}
