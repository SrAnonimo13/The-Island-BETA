import Animator from "../Game/Animator.js";
import BasicMovement from "../Game/BasicMovement.js";
import GameObjet from "../Game/GameObject.js";
import KeyEvent from "../Game/KeyEvent.js";
import Tile from "../Game/Tile.js";

export default class Player extends GameObjet{
    constructor(camera, tileSize, tileMap){
        super('Player', 0, 0)
        this.tile = new Tile('tile', '../Images/Entities/player.png', tileSize / 1.6, undefined, 3, 4)
        this.teclas = {Up: 'w', Down:'s', Left:'a', Right:"d"}
        this.camera = camera
        this.BasicMove = new BasicMovement('PlayerMovement', 3, {arrowsKeys: this.teclas})
        this.animator = new Animator(5, this.teclas, this.tile)
        this.addComponent(this.animator)
        this.addComponent(this.BasicMove)
        camera.setTarget(this)
        this.width = this.tile.width
        this.height = this.tile.height
        this.x = (tileMap.managers[0].tileMatrix.length * tileSize) / 2
        this.y = (tileMap.managers[0].tileMatrix.length * tileSize) / 2
        camera.setPosition(this.x, this.y)
        this.keyEvent = new KeyEvent()
    }

    update(ctx, camera){
        this.tile.setPosition(this.x, this.y)
        this.tile.update(ctx, camera)
    }
}