import { Time } from "@angular/common";
import { Utente } from "./utente";

export interface Permesso{

    id: number;
    dataInizio: Date;
    dataFine: Date;
    totGiorni: number;
    tipoPermesso: String;
    idUtenteApprovazione: Object;
    dalleOre: Time;
    alleOre: Time;
    totOre: number;
    delGiorno: Date;
    idUtente: number;
    utenteRichiedente: Utente;
    utenteApprovazione: Utente;
    note: String;
}