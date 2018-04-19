import { Imprimivel } from './Imprimivel';
import { Igualavel } from './Igualavel';

export interface SuperInterface<T> extends Imprimivel, Igualavel<T> {

}