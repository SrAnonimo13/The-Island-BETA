/**
 * Essa classe e essencial para a criação de elementos para o jogo
 */

import Camera from "./Camera.js";
import Game from "./Game.js";
import GameObjet from "./GameObject.js";

export default class Scene {
    /**
     * @param {String} name - Nome da sena
     */
    constructor(name){
        this.name = name
        this.elements = {}
        this.cameras = {}
        this.components = {}
        this.currentCamera = ''
    }

    getGameObject(name){
        if(name in this.elements){
            return this.elements[name]
        }else{
            throw new Error('O objeto não existe na sena')
        }
    }

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx
     * @param {Game} jogo
     */
    update(ctx, jogo){
        for(let i in this.elements){
            let element = this.elements[i]
            if(element?.update){
                let camera = this.getCamera()
                camera.setSize(jogo.elem.width, jogo.elem.height)
                element.update(ctx, camera)
                element.updateComponent()
            }else
                throw new Error('E obrigatório o uso da função update')
            
        }
        this.getCamera().updateComponent()
        this.getCamera().update()
    }

    /**
     * Essa função e utilizada para a adição de Objetos ao jogo
     * @param {GameObjet} gameObject 
     */
    addGameObject(gameObject){
        if(gameObject instanceof GameObjet)
            this.elements[gameObject.name] = gameObject
        else
            throw new Error('Essa classe não e um GameObject')
    }

    /**
     * 
     * @param {Camera} camera - Adiciona uma camera a sua cena e deixa ela como a camera principal (se não existir outra camera)
     */
    addCamera(camera){
        if(!this.currentCamera){
            this.currentCamera = camera.name
        }
        this.cameras[camera.name] = camera
    }

    /**
     * Define a camera padrão
     * @param {String} name - Nome da camera para deixar a camera padrão
     */
    setCamera(name){
        this.currentCamera = name
    }

    /**
     * Retorna a camera que esta sendo utilizada
     * @returns {Camera}
     */
    getCamera(){
        return this.cameras[this.currentCamera]
    }
}