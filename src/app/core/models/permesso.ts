import { Time } from "@angular/common";
import { Utente } from "./utente";

export interface Permesso{

    id: number;
    dataInizio: Date;
    dataFine: Date;
    totGiorni: number;
    tipoPermesso: String;
    idUtenteApprovazione: number;
    idUtenteRichiedente: number;
    dalleOre: Time;
    alleOre: Time;
    totOre: number;
    dataApprovazione: Date;
    idUtente: number;
    utenteRichiedente: Utente;
    utenteApprovazione: Utente;
    note: String;
}