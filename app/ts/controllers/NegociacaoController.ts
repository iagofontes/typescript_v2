// import { NegociacoesView } from '../views/NegociacoesView';
// import { MensagemView } from '../views/MensagemView';
// import { Negociacoes } from '../models/Negociacoes';
// import { Negociacao } from '../models/Negociacao';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { NegociacaoService, HandlerFunction } from '../services/index';

import { imprime } from '../helpers/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor() {
        // this._inputData = $('#data');
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    // @throttle()
    adiciona(event: Event) {

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._diaUtil(data)){
            this._mensagemView.update('Negociações somente em dias úteis.');
            return;
        }

        const negociacao = new Negociacao(
            data, 
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        // this._negociacoes.paraTexto();
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
        imprime(negociacao, this._negociacoes);
    }

    @throttle()
    async importar(){

        try{
            const isOk:HandlerFunction = (res:Response):Response=>{
                if(res.ok){
                    return res;
                }else{
                    throw new Error(res.statusText);
                }
            }
    
            const arrNegociacao = await this._service
                .obterNegociacoes(isOk);
    
            const jaImportadas = this._negociacoes.paraArray();
            arrNegociacao
                .filter((negociacao)=>
                    !jaImportadas.some((nego)=>negociacao.ehIgual(nego)))
                .forEach((negociacao)=>this._negociacoes.adiciona(negociacao));
            this._negociacoesView.update(this._negociacoes);
        }catch(error){
            this._mensagemView.update(error.message);
        };

        // .then((arrNegociacao)=>{

        // })
        // .catch(err=>{
        //     this._mensagemView.update(err.message);
        // });
        // fetch('http://localhost:8080/dados')
        // .then((dados)=>isOk(dados))
        // .then((resp)=>resp.json())
        // .then((response:NegociacaoParcial[])=>{
        //     response.map(data=>new Negociacao(new Date(), data.vezes, data.montante))
        //     .forEach((negociacao)=>this._negociacoes.adiciona(negociacao))
        //     this._negociacoesView.update(this._negociacoes);
        // })
        // .catch((err)=>console.error(err));
    }

    private _diaUtil(data:Date){
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }
}

export interface NegociacaoParcial {
    vezes: number;
    montante: number;
}

enum DiaDaSemana {
    Domingo,
    Segunda, 
    Terca, 
    Quarta, 
    Quinta, 
    Sexta, 
    Sabado
}