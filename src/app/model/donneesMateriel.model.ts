export interface DonneesMateriel {
  id?: number;
  compteAdministrateur?: string;
  compteUtilisateur?: string;
  mdpAdministrateur?: string;
  mdpUtilisateur?: string;
  pin?: number;
  urlConfiguration?: string;
}

export class DonneesMateriel {
  public id?: number;
  public compteAdministrateur?: string;
  public compteUtilisateur?: string;
  public mdpAdministrateur?: string;
  public mdpUtilisateur?: string;
  public pin?: number;
  public urlConfiguration?: string;

  constructor(id: number, compteAdministrateur: string, compteUtilisateur: string, mdpAdministrateur: string, mdpUtilisateur: string, pin: number, urlConfiguration: string) {
    this.id = id;
    this.compteAdministrateur = compteAdministrateur;
    this.compteUtilisateur = compteUtilisateur;
    this.mdpAdministrateur = mdpAdministrateur;
    this.mdpUtilisateur = mdpUtilisateur;
    this.pin = pin;
    this.urlConfiguration = urlConfiguration;
  }
}
