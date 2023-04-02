//Importando as classes do jogo
import Camera from './Game/Camera.js';
import Game from './Game/Game.js';
import Scene from './Game/Scene.js';
import Sprite from './Game/Sprite.js';

//Importando os scripts
import Player from './Scripts/Player.js';
import WorldGeneration from './Scripts/WorldGeneration.js';

//Definindo Variáveis
let tileSize = 110
let game = new Game({ backgroundColor: 'blue', fullSize: true });
let SenaPrincipal = new Scene('Game');
let camera = new Camera('MainCamera', 0, 0, { isLerp: true })

// let treesMap = new TileManager(
//     matrix.getTree(), 
//     new Tile('0', tileSize, new Sprite('Images/Tiles/tree0.png')), 
//     new Tile('1', tileSize, new Sprite('Images/Tiles/tree1.png'))
// )

//Configurando o jogo
game.addScene(SenaPrincipal);

const sprites = {
    player: new Sprite('../Images/Entities/player.png', 0, 3, 4),
    grass: new Sprite('Images/Tiles/grama.jpg', 1, 1, 1),
    sand: new Sprite('Images/Tiles/sand.png', 1, 1, 1),
    water: new Sprite('Images/Tiles/water1.jpg', 1, 1, 1),
    gass_tileset: new Sprite('Images/TIles/grass_tileset.png', 1, 14, 25)}

Sprite.LoadSprites(sprites)

const player = new Player(tileSize, sprites.player);

SenaPrincipal.addCamera(camera);
SenaPrincipal.addGameObject(new WorldGeneration(40, 80, sprites))

camera.setTarget(player)

// SenaPrincipal.addGameObject(new Chunk(-10, -10, 20, 80, {
//     grass: new Sprite('Images/Tiles/grama.jpg'),
//     sand: new Sprite('Images/Tiles/sand.png'),
//     water: new Sprite('Images/Tiles/water1.jpg'),
// }));
// SenaPrincipal.addGameObject(new TileMap('MapPrincipal', TilePrincipal, treesMap))
SenaPrincipal.addGameObject(player);

//Inicialização do jogo
game.resize({ fullSize: true, autoResize: true });
game.init();