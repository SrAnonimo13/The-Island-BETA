import Animator from "../Game/Animator.js";
import BasicMovement from "../Game/BasicMovement.js";
import Camera from "../Game/Camera.js";
import GameObjet from "../Game/GameObject.js";
import KeyEvent from "../Game/KeyEvent.js";
import Sprite from "../Game/Sprite.js";
import Tile from "../Game/Tile.js";

export default class Player extends GameObjet {
    tile: Tile;
    teclas: { [key: string]: string };
    camera: Camera
    
    constructor(tileSize: number, sprite: Sprite) {
        super('Player', 0, 0)
        this.tile = new Tile('player', tileSize / 1.6, sprite, 3, 4)
        this.teclas = { w: 'Up', s: 'Down', a: 'Left', d: "Right" }
        this.BasicMove = new BasicMovement('PlayerMovement', 3, { arrowsKeys: this.teclas })
        this.animator = new Animator(5, this.teclas, this.tile)
        this.addComponent(this.animator)
        this.addComponent(this.BasicMove)
        // camera.centerIn(this)
        // camera.setTarget(this)
        this.width = this.tile.width
        this.height = this.tile.height
    }

    update(ctx: CanvasRenderingContext2D, camera: Camera) {
        this.tile.setPosition(this.x, this.y)
        this.tile.update(ctx, camera)
    }
}