import { Qualifica } from './qualifica';
export interface Utente{

    id: number;
    nome: string;
    cognome: string;
    telefono: string;
    emailVigilfuoco: string;
    ruolo: string;
    codiceUtente: string;
    accountDipvvf: string;
    password: string;
    qualifica: Qualifica;
    id_qualifica: number;
}