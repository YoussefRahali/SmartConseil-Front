import { Utilisateur } from "src/app/utilisateur/utilisateur";

export class ConseilDTO {

    id!: number;
  date!: Date;
    heure!: string; 

  duree!: string;
  description!: string;

  classes!: string;
  salleId!: number;
  presidentId!:number
raporteurId!:number
  etat!: boolean;
  deroulement!: string;
}
