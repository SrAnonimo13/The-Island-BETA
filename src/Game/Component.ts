import GameObjet from "./GameObject";

/**
 * Essa classe e a base de todos os componentes do jogo
 */
export default abstract class Component{
    name: string;

    /**
     * @param {String} name - Nome do componente
     */
    constructor(name: string){
        this.name = name
    }

    abstract update(object: GameObjet): void;
}