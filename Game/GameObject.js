import Component from "./Component.js"

/**
 * Essa classe e essencial para a criação de objetos
 */
export default class GameObjet{
    /**
     * Esse elemento e essencial para a criação de objetos
     * 
     * @param {string} name - Nome do GameObject
     * @param {number} x - Posição x do GameObject
     * @param {number} y - Posição y do GameObject
     * @param {number} [width] - Largura do GameObject
     * @param {number} [height] - Altura do GameObject
     */
    constructor(name, x, y, width=0, height=0){
        this.name = name
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.components = {}
    }

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
    setPosition(x, y){
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
    move(x=0, y=0){
        this.x += x
        this.y += y
    }

    getPoss(){
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