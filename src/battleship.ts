import { PrepareShip } from './buildShip.ts';
import { Draw } from './canvas.ts';
import { Ship } from './ship';
import { IShipParams } from './interfaces/ship.interface';

class Engine {
  private ships: IShipParams[]; //корабли, учавствующие в игре
  private gameOver: boolean;
  private round: number;
  private drawHelper: Draw;
  private prepareShips: PrepareShip;

  constructor() {
    Ship.availibleTypes = ['Cruiser', 'Battleship', 'Destroyer'];

    this.gameOver = false;

    this.drawHelper = new Draw();
    this.prepareShips = new PrepareShip();
    this.ships = this.prepareShips.prepareShip(2);
    Ship.shipsInGame = this.ships;
    this.round = 1;
  }

  start() {
    this.drawHelper.startCanvas();
    this.drawHelper.matrix;
    this.drawHelper.drawElementsOnCanvas();

    // DrawHelper.drawShips();
    // this.drawHelper.drawStatistic();
  }
}

const engine = new Engine();
engine.start();
