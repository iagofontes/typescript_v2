System.register(["../models/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, NegociacaoService;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacaoService = class NegociacaoService {
                obterNegociacoes(execution) {
                    return fetch('http://localhost:8080/dados')
                        .then((dados) => execution(dados))
                        .then((resp) => resp.json())
                        .then((response) => response.map(data => new index_1.Negociacao(new Date(), data.vezes, data.montante)))
                        .catch((err) => {
                        console.error(err);
                        throw new Error('Impossível buscar negociações.');
                    });
                }
            };
            exports_1("NegociacaoService", NegociacaoService);
        }
    };
});
