import GameObjet from "../Game/GameObject.js";
import Tile from "../Game/Tile.js";
import perlin, { PerlinFunctions } from '../Game/Perlin.js'
import Sprite from "../Game/Sprite.js";
import Camera from "../Game/Camera.js";

type ChunkMatrix = Array<Tile>
export type SpritesType = {
    grass: Sprite,
    sand: Sprite,
    water: Sprite,
}

export class Chunk extends GameObjet {
    matrix: ChunkMatrix;
    noise: PerlinFunctions;
    scale: number;
    chunkSize: number;
    tileSize: number;
    sprites: SpritesType;

    chunkX: number;
    chunkY: number;

    constructor(
        x: number,
        y: number,
        chunkSize: number,
        tileSize: number,
        sprites: SpritesType,
        noise: PerlinFunctions,
        chunkX?: number,
        chunkY?: number
    ) {
        super('Chunk', x, y, chunkSize * tileSize, chunkSize * tileSize)
        this.scale = 0.04;
        this.sprites = sprites;
        this.noise = noise;

        this.matrix = [];

        this.setChunkPos(chunkX ?? 0, chunkY ?? 0);

        this.chunkSize = chunkSize;
        this.tileSize = tileSize;

        this.GenerateChunk();
    }

    setChunkPos(x: number, y: number) {
        this.chunkX = x;
        this.chunkY = y;
    }

    GenerateChunk() {
        for (let x = 0; x < this.chunkSize; x++)
            for (let y = 0; y < this.chunkSize; y++) {
                const tileX = x + this.x;
                const tileY = y + this.y;

                const tile = new Tile('tile', this.tileSize, this.getPerlinSprite(tileX, tileY));

                tile.x = tileX * this.tileSize;
                tile.y = tileY * this.tileSize;

                this.matrix.push(tile)
            }
    }

    getPerlinSprite(x: number, y: number) {
        const value = this.noise.perlin2(x * this.scale, y * this.scale)
        if (value < 0) {
            return this.sprites.grass;
        }

        if (value < 0.18) {
            return this.sprites.sand;
        }

        return this.sprites.water;

    }
    /**
     * @param {CanvasRenderingContext2D} ctx 
     */

    update(ctx: CanvasRenderingContext2D, camera: Camera) {
        this.matrix
            .filter(e => camera.isInCamera(e.x, e.y, e.width, e.height))
            .forEach(e => {
                e.update(ctx, camera);
                e.updateComponent();
            })
    }
}