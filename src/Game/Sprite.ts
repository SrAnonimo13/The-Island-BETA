/**
 * Classe de criação de imagens
 */
export default class Sprite {
    url: string;
    image: HTMLImageElement;
    priority: number

    /**Essa class e usada para criar imagens para objetos (Como o Tile)*/
    constructor(url: string, loadPriority: number, columns: number, lines: number) {
        this.url = url;
        this.priority = loadPriority;
    }

    /**
     * Essa função retorna a classe sprite com a imagem carregada
     * @returns {Sprite} 
     */
    loadImage() {
        this.image = new Image();
        this.image.src = this.url;
        return this;
    }

    onLoadImg(fc: (image: HTMLImageElement) => any) {
        this.image.onload = () => fc(this.image);
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number){
        ctx.drawImage(this.image, x, y, width, height);
    }

    static LoadSprites(sprites: { [key: string]: Sprite }) {
        Object.values(sprites)
            .sort((a, b) => compare(a.priority, b.priority))
            .forEach(e => e.loadImage());
    }
}

function compare(a: number, b: number): number {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}
