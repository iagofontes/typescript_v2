import { logTempoDeExecucao } from '../helpers/decorators/index';
export abstract class View<T> {

    protected _elemento: JQuery;
    protected _scape: boolean;

    constructor(seletor: string, scape: boolean = false) {

        this._elemento = $(seletor);
        this._scape = scape;
    }

    // @logTempoDeExecucao(true)
    @logTempoDeExecucao()
    update(model: T) {
        let template = this.template(model);
        if(this._scape)
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;

}

