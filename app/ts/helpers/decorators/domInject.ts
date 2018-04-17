export function domInject(seletor:string){

    return function(target: any, key:string){

        let element: JQuery;

        const getter = function(){
            if(!element){
                element = $(seletor);
                console.log(`buscou o elemento com seletor ${seletor}`);
            }
            return element;
        }
        Object.defineProperty(target, key, {
            get: getter
        });
    }
}