/**
 * Essa classe e essencial para a criação de elementos para o jogo
 */

import Camera from "./Camera.js";
import Component from "./Component.js";
import Game from "./Game.js";
import GameObjet from "./GameObject.js";

export default class Scene {
    name: string;
    elements: { [name: string]: GameObjet };
    cameras: { [name: string]: Camera };
    components: { [name: string]: Component };
    currentCamera: string;
    game: Game;

    /**
     * @param {String} name - Nome da sena
     */
    constructor(name: string) {
        this.name = name
        this.elements = {}
        this.cameras = {}
        this.components = {}
        this.currentCamera = ''
    }

    getGameObject(name: string) {
        if (name in this.elements) {
            return this.elements[name]
        } else {
            throw new Error(`O objeto '${name}' não existe na sena`)
        }
    }

    setGame(game: Game) {
        this.game = game;
    }

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx
     * @param {Game} jogo
     */
    update(ctx: CanvasRenderingContext2D, jogo: Game) {
        let camera = this.getCamera()
        camera.setSize(jogo.elem.width, jogo.elem.height)

        Object.values(this.elements)
        // .map(v => camera.isInCamera(v.x, v.y, v.width, v.height))
        .forEach(element => {
            if (!element?.update)
                throw new Error('E obrigatório o uso da função update')

            element.update(ctx, camera);
            element.updateComponent();
        })

        this.getCamera().updateComponent()
        this.getCamera().update()
    }

    /**
     * Essa função e utilizada para a adição de Objetos ao jogo
     * @param {GameObjet} gameObject 
     */
    addGameObject(gameObject: GameObjet) {
        this.elements[gameObject.name] = gameObject;
    }

    /**
     * 
     * @param {Camera} camera - Adiciona uma camera a sua cena e deixa ela como a camera principal (se não existir outra camera)
     */
    addCamera(camera: Camera) {
        camera.setSize(this.game.elem.width, this.game.elem.height)

        if (!this.currentCamera) {
            this.currentCamera = camera.name
        }
        this.cameras[camera.name] = camera
    }

    /**
     * Define a camera padrão
     * @param {String} name - Nome da camera para deixar a camera padrão
     */
    setCamera(name: string) {
        this.currentCamera = name
    }

    /**
     * Retorna a camera que esta sendo utilizada
     * @returns {Camera}
     */
    getCamera(): Camera {
        return this.cameras[this.currentCamera]
    }
}