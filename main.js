//Importando as classes do jogo
import BasicMovement from './Game/BasicMovement.js';
import Camera from './Game/Camera.js';
import Game from './Game/Game.js';
import Scene from './Game/Scene.js';
import Tile from './Game/Tile.js';
import TileManager from './Game/TileManager.js';
import TileMap from './Game/TileMap.js';

//Importando os scripts
import Matrix from './Scripts/JogoMatrix.js';

//Definindo Variáveis
let tileSize = 100
let game = new Game({backgroundColor: 'black'});
let SenaPrincipal = new Scene('Game');
let TilePrincipal = new TileManager(Matrix, new Tile(0, 'Images/Tiles/crate.png', tileSize), new Tile(1, 'Images/Tiles/sand.png', tileSize))

//Configurando o jogo
SenaPrincipal.addCamera(new Camera('MainCamera', 0, 0));
SenaPrincipal.getCamera().addComponent(new BasicMovement('CameraMovement', 2, {arrowsKeys: {Up: 'w', Down:'s', Left:'a', Right:"d"}}))
//Inicialização do jogo
game.resize({fullSize:true, autoResize:true});
SenaPrincipal.addGameObject(new TileMap('MapPrincipal', TilePrincipal))
game.addScene(SenaPrincipal);
game.init();