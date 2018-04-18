import { Negociacao } from '../models/index';
import { NegociacaoParcial } from '../controllers/NegociacaoController';

export class NegociacaoService {

    obterNegociacoes(execution: Function): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
        .then((dados)=>execution(dados))
        .then((resp)=>resp.json())
        .then((response:NegociacaoParcial[])=>response.map(data=>new Negociacao(new Date(), data.vezes, data.montante)))
        .catch((err)=>console.error(err));
    }
}