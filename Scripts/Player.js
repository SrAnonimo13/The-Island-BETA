import Animator from "../Game/Animator.js";
import BasicMovement from "../Game/BasicMovement.js";
import GameObjet from "../Game/GameObject.js";
import Tile from "../Game/Tile.js";

export default class Player extends GameObjet{
    constructor(camera){
        super('Player', 0, 0)
        this.tile = new Tile('tile', '../Images/Entities/player.png', 80, undefined, 3, 4)
        this.teclas = {Up: 'w', Down:'s', Left:'a', Right:"d"}
        this.camera = camera
        this.BasicMove = new BasicMovement('PlayerMovement', 4, {arrowsKeys: this.teclas})
        this.animator = new Animator(6, this.teclas, this.tile)
        this.addComponent(this.animator)
        this.addComponent(this.BasicMove)
        camera.setTarget(this)
        this.width = this.tile.width
        this.height = this.tile.height
    }

    update(ctx, camera){
        this.tile.setPosition(this.x, this.y)
        this.tile.update(ctx, camera)
    }
}