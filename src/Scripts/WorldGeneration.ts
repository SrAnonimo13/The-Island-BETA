import Camera from "../Game/Camera.js";
import GameObjet from "../Game/GameObject.js";
import Perlin, { PerlinFunctions } from "../Game/Perlin.js";
import Sprite from "../Game/Sprite.js";
import { Chunk, SpritesType } from "./Chunk.js";

export default class WorldGeneration extends GameObjet {
    chunks: Array<Chunk>;
    sprites: SpritesType;
    chunkSize: number;
    tileSize: number;
    noise: PerlinFunctions;

    constructor(chunkSize: number, tileSize: number, sprites: SpritesType) {
        super('WorldGeneration', 0, 0, 0, 0);

        this.chunkSize = chunkSize;
        this.tileSize = tileSize;

        this.sprites = sprites;

        this.noise = Perlin()
        this.noise.seed(Math.random())

        this.chunks = [
            new Chunk(chunkSize / 2 * -1, chunkSize / 2 * -1, chunkSize, tileSize, this.sprites, this.noise)
        ];
    }

    getVisibleChunks(camera: Camera): Array<Chunk> {
        return this.chunks.filter(e => camera.isInCamera(e.x * this.tileSize, e.y * this.tileSize, e.width, e.height))
    }

    update(ctx: CanvasRenderingContext2D, camera: Camera): void {
        const visibleChunks = this.getVisibleChunks(camera);

        visibleChunks.forEach(chunk => {

            if (!this.chunks.find(e => e.chunkY == chunk.chunkY - 1 && chunk.chunkX == e.chunkX)) {
                this.chunks.push(
                    new Chunk(chunk.x, chunk.y + this.chunkSize, this.chunkSize, this.tileSize, this.sprites, this.noise, chunk.chunkX, chunk.chunkY - 1)
                );
            }

            if (!this.chunks.find(e => e.chunkY == chunk.chunkY + 1 && chunk.chunkX == e.chunkX)) {
                this.chunks.push(
                    new Chunk(chunk.x, chunk.y - this.chunkSize, this.chunkSize, this.tileSize, this.sprites, this.noise, chunk.chunkX, chunk.chunkY + 1)
                );
            }

            if (!this.chunks.find(e => e.chunkY == chunk.chunkY && chunk.chunkX == e.chunkX - 1)) {
                this.chunks.push(
                    new Chunk(chunk.x + this.chunkSize, chunk.y, this.chunkSize, this.tileSize, this.sprites, this.noise, chunk.chunkX + 1, chunk.chunkY)
                );
            }

            if (!this.chunks.find(e => e.chunkY == chunk.chunkY && chunk.chunkX == e.chunkX + 1)) {
                this.chunks.push(
                    new Chunk(chunk.x - this.chunkSize, chunk.y, this.chunkSize, this.tileSize, this.sprites, this.noise, chunk.chunkX - 1, chunk.chunkY)
                );
            }

            chunk.update(ctx, camera);
            chunk.updateComponent();
        });
    }
}