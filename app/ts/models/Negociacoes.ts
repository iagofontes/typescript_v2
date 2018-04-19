import { Negociacao } from './Negociacao';
import { SuperInterface } from './RootInterface';

export class Negociacoes implements SuperInterface<Negociacoes> {

    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes):boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}
