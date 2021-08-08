import Tile from "./Tile.js";

export default class TileManager {
    /**
     * Essa classe e usada para criação de grides no cenário
     * @param {Array<Array<Number>>} matrix - Uma Matrix 2d para a criação dos tiles
     * @param  {...Tile} tiles - Tiles
     */
    constructor(matrix, ...tiles) {
        this.matrix = matrix
        this.tiles = tiles
        this.tileMatrix = [...Array(matrix.length)].map(e => Array(matrix[0].length).fill(-1));
        this.x = 0
        this.y = 0
        this.tileMatrix = this.getMatrix()
    }

    /**
     * Essa função cria uma matrix 2d de tiles
     * @returns {Array<Array<Tile>>}
     */
    getMatrix() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.tiles.forEach((tile) => {
                    if (tile.id < 0) throw new Error('So e permitido números acima de 0, id indicado:' + tile.id)
                    if (this.matrix[i][j] == tile.id) {
                        this.tileMatrix[i][j] = new Tile(tile.id, tile.url, tile.height, tile.sprite.image)
                        this.tileMatrix[i][j].x = (tile.width * i) + this.x
                        this.tileMatrix[i][j].y = (tile.height * j) + this.y
                    }
                })
            }
        }
        return this.tileMatrix
    }

    /**
     * @param {MatrixCallback} fc
     * @callback MatrixCallback
     * @param {Tile} value - Valor em tile ou em numero
     * @param {Number} [i] - Index da linha
     * @param {Number} [j] - Index da coluna
     * @param {Array<Array<Tile|Number>>} [array] - Array 2d padrão
     */
    Matrix2dForeach(fc) {
        for (let i = 0; i < this.tileMatrix.length; i++) {
            for (let j = 0; j < this.tileMatrix[i].length; j++) {
                /**@type {Tile} */
                let value = this.tileMatrix[i][j]
                fc(value, i, j, this.tileMatrix)
            }
        }
    }
}