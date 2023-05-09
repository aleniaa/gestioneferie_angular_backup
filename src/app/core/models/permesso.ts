import { Time } from "@angular/common";

export interface Permesso{

    id: number;
    dataInizio: Date;
    dataFine: Date;
    totGiorni: number;
    tipoPermesso: String;
    idUtenteApprovazione: number;
    dalleOre: Time;
    alleOre: Time;
    delGiorno: Date;
    idUtente: number;
}