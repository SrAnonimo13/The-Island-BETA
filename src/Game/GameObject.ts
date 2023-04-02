import Camera from "./Camera.js"
import Component from "./Component.js"

/**
 * Essa classe e essencial para a criação de objetos
 */
export default abstract class GameObjet{
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    components: { [name: string]: Component };
    ever_visible: boolean;

    constructor(name: string, x: number, y: number, width: number=0, height: number=0){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.components = {};
        this.ever_visible = false;
    }

    abstract update(ctx: CanvasRenderingContext2D, camera: Camera): void;

    /**
     * Essa função adiciona um componente para um GameObject
     * @param {Component} component - Componente á adicionar
     */
    addComponent(component){
        this.components[component.name] = component
    }

    /**
     * Essa função e utilizada para a atualização dos componentes
     */
    updateComponent(){
        for(let i in this.components){
            this.components[i].update(this)
        }
    }

    /**
     * Essa função muda a posição do objeto
     * @param {Number} x - Nova posição do eixo x
     * @param {Number} y - Nova posição do eixo y
     * @example
     * //objeto = {x:3, y:3}
     * GameObject.setPosition(10, 10)
     * //objeto = {x: 10, x:10}
     */
    setPosition(x: number, y: number){
        this.x = x
        this.y = y
    }

    /**
     * Essa função move o objeto de lugar
     * @param {Number} [x] - Posição do eixo x
     * @param {Number} [y] - Posição do eixo y
     * @example
     * //objeto = {x:3, y:3}
     * GameObject.move(10, 10)
     * //objeto = {x: 13, x:13}
     */
    move(x: number=0, y: number=0){
        this.x += x
        this.y += y
    }

    getPoss(): [number, number]{
        return [this.x, this.y]
    }

    /**
     * Essa função seta o tamanho de um GameObject
     * @param {Number} width - Nova largura do GameObject
     * @param {Number} height - Nova altura do GameObject
     */
    setSize(width, height){
        this.width = width
        this.height = height
    }
}